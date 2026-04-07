import { CatalogFilters, CatalogMatchMode, CatalogSpecialistsResponse, CatalogSort } from "@/features/catalog/model/types";
import {
    isAllowedGender,
    isAllowedLanguage,
    isAllowedMeetingFormat,
    isAllowedProfession,
    isAllowedSessionType,
    isAllowedSort,
} from "@/features/catalog/model/catalogEnums";
import { adminDb } from "@/src/server/firebase/admin";
import { NextRequest, NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import type { SpecialistDTO } from "@/features/specialist/model/types";

const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 24;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const PROFESSION_ORDER: Record<SpecialistDTO["profession"], number> = {
    psychologist: 0,
    therapist: 1,
    coach: 2,
};

type CacheEntry = {
    sorted: SpecialistDTO[];
    matchMode: CatalogMatchMode;
    timestamp: number;
};

const cache = new Map<string, CacheEntry>();

function buildCacheKey(filters: CatalogFilters, sort: CatalogSort): string {
    return JSON.stringify({ filters, sort });
}

function getFromCache(key: string): CacheEntry | null {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
        cache.delete(key);
        return null;
    }
    return entry;
}

function setInCache(key: string, entry: Omit<CacheEntry, "timestamp">): void {
    if (cache.size > 200) {
        const now = Date.now();
        for (const [k, v] of cache) {
            if (now - v.timestamp > CACHE_TTL_MS) cache.delete(k);
        }
    }
    cache.set(key, { ...entry, timestamp: Date.now() });
}


type CursorPayload = { offset: number };

function encodeCursor(payload: CursorPayload): string {
    return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodeCursor(value: string | null): CursorPayload | null {
    if (!value) return { offset: 0 };
    try {
        const decoded = Buffer.from(value, "base64url").toString("utf8");
        const parsed = JSON.parse(decoded) as CursorPayload;
        if (typeof parsed.offset !== "number" || parsed.offset < 0) return null;
        return { offset: Math.floor(parsed.offset) };
    } catch {
        return null;
    }
}


function toNumber(value: string | null): number | undefined {
    if (value == null || value.trim() === "") return undefined;
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return undefined;
    return parsed;
}

function toIsoString(value: unknown): string {
    if (value instanceof Timestamp) return value.toDate().toISOString();
    if (value instanceof Date) return value.toISOString();
    if (typeof value === "string") return value;
    return "";
}


function parseFilters(searchParams: URLSearchParams): CatalogFilters {
    const filters: CatalogFilters = {};

    const profession = searchParams.get("profession");
    filters.profession =
        profession && isAllowedProfession(profession) ? profession : "psychologist";

    const gender = searchParams.get("gender");
    if (gender && isAllowedGender(gender)) filters.gender = gender;

    const meetingFormat = searchParams.get("meetingFormat");
    if (meetingFormat && isAllowedMeetingFormat(meetingFormat)) {
        filters.meetingFormat = meetingFormat;
    }

    const language = searchParams.get("language");
    if (language && isAllowedLanguage(language)) filters.language = language;

    const sessionType = searchParams.get("sessionType");
    if (sessionType && isAllowedSessionType(sessionType)) {
        filters.sessionType = sessionType;
    }

    const servicesCsv = searchParams.get("services");
    if (servicesCsv) {
        const values = servicesCsv.split(",").map((v) => v.trim()).filter(Boolean);
        if (values.length > 0) filters.services = values;
    }

    const priceMin = toNumber(searchParams.get("priceMin"));
    if (priceMin != null) filters.priceMin = priceMin;
    const priceMax = toNumber(searchParams.get("priceMax"));
    if (priceMax != null) filters.priceMax = priceMax;

    return filters;
}

function parseSort(searchParams: URLSearchParams): CatalogSort {
    const sort = searchParams.get("sort");
    return sort && isAllowedSort(sort) ? sort : "default";
}


function toSpecialistDTO(
    docId: string,
    data: FirebaseFirestore.DocumentData
): SpecialistDTO {
    const dto: SpecialistDTO = {
        id: docId,
        firstName: String(data.firstName ?? ""),
        lastName: String(data.lastName ?? ""),
        phoneNumber: String(data.phoneNumber ?? ""),
        photoUrl: data.photoUrl == null ? null : String(data.photoUrl),
        birthDate: toIsoString(data.birthDate),
        gender: data.gender === "male" ? "male" : "female",
        languages: Array.isArray(data.languages) ? data.languages : [],
        profession:
            data.profession === "therapist" || data.profession === "coach"
                ? data.profession
                : "psychologist",
        meetingFormat: data.meetingFormat === "offline" ? "offline" : "online",
        sessionTypes: Array.isArray(data.sessionTypes) ? data.sessionTypes : [],
        experience: Number(data.experience ?? 0),
        pricePerSession: Number(data.pricePerSession ?? 0),
        services: Array.isArray(data.services) ? data.services : [],
        about: typeof data.about === "string" ? data.about : "",
        workMethods: typeof data.workMethods === "string" && data.workMethods
            ? [data.workMethods]
            : Array.isArray(data.workMethods) ? data.workMethods : [],
        values: typeof data.values === "string" ? data.values : "",
        mainDegree: data.mainDegree && typeof data.mainDegree === "object"
            ? data.mainDegree
            : { degreeName: "", description: "" },
        additionalDegrees: Array.isArray(data.additionalDegrees) ? data.additionalDegrees : [],
    };

    return dto;
}


function applyStrictBaseFilters(s: SpecialistDTO, f: CatalogFilters): boolean {
    if (f.profession && s.profession !== f.profession) return false;
    if (f.priceMin != null && s.pricePerSession < f.priceMin) return false;
    if (f.priceMax != null && s.pricePerSession > f.priceMax) return false;
    return true;
}

function matchesStrictOptionalFilters(s: SpecialistDTO, f: CatalogFilters): boolean {
    if (f.gender && s.gender !== f.gender) return false;
    if (f.language && !s.languages.includes(f.language)) return false;
    if (f.meetingFormat && s.meetingFormat !== f.meetingFormat) return false;
    if (f.sessionType && !s.sessionTypes.includes(f.sessionType)) return false;
    if (f.services && f.services.length > 0) {
        const svcs = s.services.map((v) => String(v).toLowerCase());
        const sel = f.services.map((v) => v.toLowerCase());
        if (!sel.some((v) => svcs.includes(v))) return false;
    }
    return true;
}

function hasAnySoftFilter(f: CatalogFilters): boolean {
    return Boolean(
        f.gender || f.language || f.meetingFormat || f.sessionType ||
        (f.services && f.services.length > 0)
    );
}

function matchesAnySoftFilter(s: SpecialistDTO, f: CatalogFilters): boolean {
    if (f.gender && s.gender === f.gender) return true;
    if (f.language && s.languages.includes(f.language)) return true;
    if (f.meetingFormat && s.meetingFormat === f.meetingFormat) return true;
    if (f.sessionType && s.sessionTypes.includes(f.sessionType)) return true;
    if (f.services && f.services.length > 0) {
        const svcs = s.services.map((v) => String(v).toLowerCase());
        const sel = f.services.map((v) => v.toLowerCase());
        if (sel.some((v) => svcs.includes(v))) return true;
    }
    return false;
}


function applySort(items: SpecialistDTO[], sort: CatalogSort): SpecialistDTO[] {
    const sorted = items.slice();
    switch (sort) {
        case "experience_desc": sorted.sort((a, b) => b.experience - a.experience); break;
        case "experience_asc":  sorted.sort((a, b) => a.experience - b.experience); break;
        case "price_asc":       sorted.sort((a, b) => a.pricePerSession - b.pricePerSession); break;
        case "price_desc":      sorted.sort((a, b) => b.pricePerSession - a.pricePerSession); break;
        default:
            sorted.sort((a, b) => {
                const byProf = PROFESSION_ORDER[a.profession] - PROFESSION_ORDER[b.profession];
                return byProf !== 0 ? byProf : b.experience - a.experience;
            });
    }
    return sorted;
}


async function fetchSorted(
    filters: CatalogFilters,
    sort: CatalogSort
): Promise<{ sorted: SpecialistDTO[]; matchMode: CatalogMatchMode }> {
    const baseQuery = adminDb.collection("specialists");
    const snapshot = filters.profession
        ? await baseQuery.where("profession", "==", filters.profession).get()
        : await baseQuery.get();

    const all = snapshot.docs.map((doc) => toSpecialistDTO(doc.id, doc.data()));

    const strictBase = all.filter((s) => applyStrictBaseFilters(s, filters));
    const strict = strictBase.filter((s) => matchesStrictOptionalFilters(s, filters));

    let matchMode: CatalogMatchMode = "strict";
    let matched = strict;

    if (strict.length === 0 && hasAnySoftFilter(filters)) {
        matchMode = "fallback";
        matched = strictBase.filter((s) => matchesAnySoftFilter(s, filters));
    }

    return { sorted: applySort(matched, sort), matchMode };
}


export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const filters = parseFilters(params);
        const sort = parseSort(params);
        const cursorPayload = decodeCursor(params.get("cursor"));

        if (!cursorPayload) {
            return NextResponse.json({ error: "Invalid cursor format" }, { status: 400 });
        }

        const limitParam = Number(params.get("limit"));
        const limit =
            Number.isFinite(limitParam) && limitParam > 0
                ? Math.min(Math.floor(limitParam), MAX_LIMIT)
                : DEFAULT_LIMIT;

        const cacheKey = buildCacheKey(filters, sort);
        const cached = getFromCache(cacheKey);

        const { sorted, matchMode } = cached ?? await (async () => {
            const result = await fetchSorted(filters, sort);
            setInCache(cacheKey, result);
            return result;
        })();

        const start = cursorPayload.offset;
        const end = start + limit;
        const items = sorted.slice(start, end);
        const hasMore = end < sorted.length;

        const response: CatalogSpecialistsResponse = {
            items,
            nextCursor: hasMore ? encodeCursor({ offset: end }) : null,
            prevCursor: start > 0 ? encodeCursor({ offset: Math.max(0, start - limit) }) : null,
            hasMore,
            matchMode,
            total: sorted.length,
        };

        return NextResponse.json(response, {
            headers: { "Cache-Control": "private, max-age=300" },
        });
    } catch (error) {
        console.error("[GET /api/catalog/specialists]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
