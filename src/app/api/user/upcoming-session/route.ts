import { Session } from "@/features/session/model/types";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminDb } from "@/src/server/firebase/admin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    console.log("GET request upcoming-session route");
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;
        const now = new Date();

        console.log("uid", uid);

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

        console.log("session", session.specialistId);

        const specialistSnap = await adminDb
            .collection("specialists")
            .where("id", "==", session.specialistId)
            .limit(1)
            .get();
        if (specialistSnap.empty) {
            return NextResponse.json(
                { error: "Specialist not found" },
                { status: 404 },
            );
        }
        const specialistDoc = specialistSnap.docs[0];
        const specialist = {
            id: specialistDoc.id, 
            ...specialistDoc.data(),
        };

        console.log("specialist", specialist.id);

        return NextResponse.json({ session, specialist }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
