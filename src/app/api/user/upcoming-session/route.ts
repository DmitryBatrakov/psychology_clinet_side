import { Session } from "@/features/session/model/types";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminDb } from "@/src/server/firebase/admin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;
        const now = new Date();

        const sessionSnap = await adminDb
            .collection("sessions")
            .where("userId", "==", uid)
            .where("status", "==", "upcoming")
            .where("startAt", ">=", now)
            .orderBy("startAt", "asc")
            .limit(1)
            .get();
        if (sessionSnap.empty) {
            return NextResponse.json(
                { error: "Session not found" },
                { status: 404 },
            );
        }

        const sessionDoc = sessionSnap.docs[0];
        const session = {
            id: sessionDoc.id,
            ...(sessionDoc.data() as Omit<Session, "id">),
        };

        const specialistSnap = await adminDb
            .collection("specialists")
            .doc(session.specialistId)
            .get();
        if (!specialistSnap.exists) {
            return NextResponse.json(
                { error: "Specialist not found" },
                { status: 404 },
            );
        }
        const specialist = {
            ...specialistSnap.data(),
            id: specialistSnap.id,
        };
        return NextResponse.json({ session, specialist }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
