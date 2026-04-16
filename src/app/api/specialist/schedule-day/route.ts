import type { SessionDTO } from "@/features/session/model/types";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminDb } from "@/src/server/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

function toPlainSession(doc: FirebaseFirestore.QueryDocumentSnapshot): SessionDTO {
    const data = doc.data() as Omit<SessionDTO, "id" | "startAt" | "endAt" | "date"> & {
        startAt: Timestamp;
        endAt: Timestamp | undefined;
        date: Timestamp;
    };
    return {
        id: doc.id,
        userId: data.userId,
        specialistId: data.specialistId,
        status: data.status,
        income: data.income,
        meetingUrl: data.meetingUrl,
        createdAt: data.createdAt,
        type: data.type,
        date: data.date.toDate().toISOString(),
        startAt: data.startAt.toDate().toISOString(),
        endAt: data.endAt ? data.endAt.toDate().toISOString() : undefined,
    };
}

export async function GET(req: NextRequest) {
    try {
        const decoded = await requireAuth(req);

        if (decoded.role !== "specialist") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const uid = decoded.uid;

        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

        const sessionsSnap = await adminDb
            .collection("sessions")
            // .where("status", "==", "upcoming")
            .where("specialistId", "==", uid)
            .where("startAt", ">=", Timestamp.fromDate(startOfDay))
            .where("startAt", "<=", Timestamp.fromDate(endOfDay))
            .orderBy("startAt", "asc")
            .get();

        if (sessionsSnap.empty) {
            return NextResponse.json({ items: [] });
        }

        const sessions = sessionsSnap.docs.map(toPlainSession);

        const uniquePatientIds = [...new Set(sessions.map((s) => s.userId))];

        const patientSnaps = await Promise.all(
            uniquePatientIds.map((id) => adminDb.collection("users").doc(id).get()),
        );

        const patientsMap = new Map(
            patientSnaps
                .filter((snap) => snap.exists)
                .map((snap) => [
                    snap.id,
                    {
                        id: snap.id,
                        firstName: snap.data()?.firstName ?? "",
                        lastName: snap.data()?.lastName ?? "",
                        photoUrl: snap.data()?.photoUrl ?? null,
                    },
                ]),
        );

        const items = sessions.map((session) => ({
            session,
            patient: patientsMap.get(session.userId) ?? {
                id: session.userId,
                firstName: "",
                lastName: "",
                photoUrl: null,
            },
        }));

        return NextResponse.json({ items });
    } catch (error) {
        console.error("[GET /specialist/schedule-day]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
