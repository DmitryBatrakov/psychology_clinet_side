import { adminDb } from "@/src/server/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import type { SessionDTO } from "@/features/session/model/types";
import type { ScheduleOverride, ScheduleRule } from "@/features/slot/model/type";

type SpecialistScheduleResponse = {
    rule: ScheduleRule | null;
    overrides: ScheduleOverride[];
    sessions: SessionDTO[];
};

function toIsoString(value: unknown): string | undefined {
    if (!value) return undefined;
    if (value instanceof Timestamp) return value.toDate().toISOString();
    if (value instanceof Date) return value.toISOString();
    if (typeof value === "string") return value;
    return undefined;
}

function toScheduleRule(
    doc: FirebaseFirestore.QueryDocumentSnapshot
): ScheduleRule {
    const data = doc.data();
    return {
        id: doc.id,
        specialistId: String(data.specialistId ?? ""),
        type: "weekly",
        timeZone: String(data.timeZone ?? "Asia/Jerusalem"),
        weekdayIntervals: data.weekdayIntervals,
        isActive: Boolean(data.isActive),
        displayHorizonMonths: data.displayHorizonMonths,
        createdAt: toIsoString(data.createdAt) ?? new Date().toISOString(),
        updatedAt: toIsoString(data.updatedAt) ?? new Date().toISOString(),
    };
}

function toScheduleOverride(
    doc: FirebaseFirestore.QueryDocumentSnapshot
): ScheduleOverride {
    const data = doc.data();
    return {
        id: doc.id,
        specialistId: String(data.specialistId ?? ""),
        date: String(data.date ?? ""),
        type: data.type,
        reason: data.reason,
        blockAllDay: data.blockAllDay,
        blockStartTime: data.blockStartTime,
        blockEndTime: data.blockEndTime,
        customIntervals: data.customIntervals,
        addIntervals: data.addIntervals,
        createdAt: toIsoString(data.createdAt) ?? new Date().toISOString(),
        updatedAt: toIsoString(data.updatedAt) ?? new Date().toISOString(),
    };
}

function toSessionDTO(doc: FirebaseFirestore.QueryDocumentSnapshot): SessionDTO {
    const data = doc.data();
    return {
        id: doc.id,
        userId: String(data.userId ?? ""),
        specialistId: String(data.specialistId ?? ""),
        startAt: toIsoString(data.startAt) ?? new Date().toISOString(),
        endAt: toIsoString(data.endAt),
        date: toIsoString(data.date) ?? new Date().toISOString(),
        status: data.status ?? "upcoming",
        type: data.type,
        createdAt: toIsoString(data.createdAt) ?? String(data.createdAt ?? ""),
        income: Number(data.income ?? 0),
        meetingUrl: data.meetingUrl,
    };
}

export async function GET(req: NextRequest) {
    try {
        const specialistId = req.nextUrl.searchParams.get("specialistId");
        if (!specialistId) {
            return NextResponse.json(
                { error: "specialistId is required" },
                { status: 400 }
            );
        }

        const [ruleSnap, overrideSnap, sessionSnap] = await Promise.all([
            adminDb
                .collection("scheduleRules")
                .where("specialistId", "==", specialistId)
                .where("isActive", "==", true)
                .limit(1)
                .get(),
            adminDb
                .collection("scheduleOverrides")
                .where("specialistId", "==", specialistId)
                .get(),
            adminDb
                .collection("sessions")
                .where("specialistId", "==", specialistId)
                .get(),
        ]);

        const payload: SpecialistScheduleResponse = {
            rule: ruleSnap.empty ? null : toScheduleRule(ruleSnap.docs[0]),
            overrides: overrideSnap.docs.map(toScheduleOverride),
            sessions: sessionSnap.docs.map(toSessionDTO),
        };

        return NextResponse.json(payload);
    } catch (error) {
        console.error("[GET /api/slot/specialist-schedule]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
