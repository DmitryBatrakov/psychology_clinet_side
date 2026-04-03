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

const PROFESSION_ORDER: Record<SpecialistDTO["profession"], number> = {
    psychologist: 0,
    therapist: 1,
    coach: 2,
};

type CursorPayload = {
    offset: number;
};

function encodeCursor(payload: CursorPayload): string {
    return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodeCursor(value: string | null): CursorPayload | null {
    if (!value) return { offset: 0 };
    try {
        const decoded = Buffer.from(value, "base64url").toString("utf8");
        const parsed = JSON.parse(decoded) as CursorPayload;
        if (typeof parsed.offset !== "number" || parsed.offset < 0) {
            return null;
        }
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
        profession && isAllowedProfession(profession)
            ? profession
            : "psychologist";

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
        const values = servicesCsv
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean);
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
    return {
        id: docId,
        firstName: String(data.firstName ?? ""),
        lastName: String(data.lastName ?? ""),
        phoneNumber: String(data.phoneNumber ?? ""),
        photoUrl:
            data.photoUrl == null ? null : String(data.photoUrl),
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
    };
}

function applyStrictBaseFilters(
    specialist: SpecialistDTO,
    filters: CatalogFilters
): boolean {
    if (filters.profession && specialist.profession !== filters.profession) {
        return false;
    }
    if (
        filters.priceMin != null &&
        specialist.pricePerSession < filters.priceMin
    ) {
        return false;
    }
    if (
        filters.priceMax != null &&
        specialist.pricePerSession > filters.priceMax
    ) {
        return false;
    }
    return true;
}

function matchesStrictOptionalFilters(
    specialist: SpecialistDTO,
    filters: CatalogFilters
): boolean {
    if (filters.gender && specialist.gender !== filters.gender) return false;
    if (
        filters.language &&
        !specialist.languages.includes(filters.language)
    ) {
        return false;
    }
    if (
        filters.meetingFormat &&
        specialist.meetingFormat !== filters.meetingFormat
    ) {
        return false;
    }
    if (
        filters.sessionType &&
        !specialist.sessionTypes.includes(filters.sessionType)
    ) {
        return false;
    }
    if (filters.services && filters.services.length > 0) {
        const services = specialist.services.map((svc) =>
            String(svc).toLowerCase()
        );
        const selected = filters.services.map((svc) => svc.toLowerCase());
        const hasService = selected.some((svc) => services.includes(svc));
        if (!hasService) return false;
    }
    return true;
}

function hasAnySoftFilter(filters: CatalogFilters): boolean {
    return Boolean(
        filters.gender ||
            filters.language ||
            filters.meetingFormat ||
            filters.sessionType ||
            (filters.services && filters.services.length > 0)
    );
}

function matchesAnySoftFilter(
    specialist: SpecialistDTO,
    filters: CatalogFilters
): boolean {
    const checks: boolean[] = [];

    if (filters.gender) checks.push(specialist.gender === filters.gender);
    if (filters.language) {
        checks.push(specialist.languages.includes(filters.language));
    }
    if (filters.meetingFormat) {
        checks.push(specialist.meetingFormat === filters.meetingFormat);
    }
    if (filters.sessionType) {
        checks.push(specialist.sessionTypes.includes(filters.sessionType));
    }
    if (filters.services && filters.services.length > 0) {
        const services = specialist.services.map((svc) =>
            String(svc).toLowerCase()
        );
        const selected = filters.services.map((svc) => svc.toLowerCase());
        checks.push(selected.some((svc) => services.includes(svc)));
    }

    if (checks.length === 0) return true;
    return checks.some(Boolean);
}

function applySort(items: SpecialistDTO[], sort: CatalogSort): SpecialistDTO[] {
    const sorted = items.slice();

    switch (sort) {
        case "experience_desc":
            sorted.sort((a, b) => b.experience - a.experience);
            break;
        case "experience_asc":
            sorted.sort((a, b) => a.experience - b.experience);
            break;
        case "price_asc":
            sorted.sort((a, b) => a.pricePerSession - b.pricePerSession);
            break;
        case "price_desc":
            sorted.sort((a, b) => b.pricePerSession - a.pricePerSession);
            break;
        case "default":
        default:
            sorted.sort((a, b) => {
                const byProfession =
                    PROFESSION_ORDER[a.profession] -
                    PROFESSION_ORDER[b.profession];
                if (byProfession !== 0) return byProfession;
                return b.experience - a.experience;
            });
            break;
    }

    return sorted;
}

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const filters = parseFilters(params);
        const sort = parseSort(params);
        const cursorPayload = decodeCursor(params.get("cursor"));

        if (!cursorPayload) {
            return NextResponse.json(
                { error: "Invalid cursor format" },
                { status: 400 }
            );
        }

        const limitParam = Number(params.get("limit"));
        const limit =
            Number.isFinite(limitParam) && limitParam > 0
                ? Math.min(Math.floor(limitParam), MAX_LIMIT)
                : DEFAULT_LIMIT;

        const baseQuery = adminDb.collection("specialists");
        const snapshot = filters.profession
            ? await baseQuery
                  .where("profession", "==", filters.profession)
                  .get()
            : await baseQuery.get();

        const specialists = snapshot.docs.map((doc) =>
            toSpecialistDTO(doc.id, doc.data())
        );

        const strictBaseList = specialists.filter((specialist) =>
            applyStrictBaseFilters(specialist, filters)
        );
        const strictList = strictBaseList.filter((specialist) =>
            matchesStrictOptionalFilters(specialist, filters)
        );

        let matchMode: CatalogMatchMode = "strict";
        let matched = strictList;

        if (strictList.length === 0 && hasAnySoftFilter(filters)) {
            matchMode = "fallback";
            matched = strictBaseList.filter((specialist) =>
                matchesAnySoftFilter(specialist, filters)
            );
        }

        const sorted = applySort(matched, sort);

        const start = cursorPayload.offset;
        const end = start + limit;
        const items = sorted.slice(start, end);
        const hasMore = end < sorted.length;

        const response: CatalogSpecialistsResponse = {
            items,
            nextCursor: hasMore ? encodeCursor({ offset: end }) : null,
            prevCursor:
                start > 0
                    ? encodeCursor({ offset: Math.max(0, start - limit) })
                    : null,
            hasMore,
            matchMode,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("[GET /api/catalog/specialists]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
