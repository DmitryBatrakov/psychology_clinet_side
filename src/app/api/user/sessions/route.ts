import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminDb } from "@/src/server/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;

        const now = Timestamp.now();

        const [pastSnap, upcomingSnap] = await Promise.all([
            adminDb
                .collection("sessions")
                .where("userId", "==", uid)
                .where("date", "<", now)
                .orderBy("date", "desc")
                .get(),

            adminDb
                .collection("sessions")
                .where("userId", "==", uid)
                .where("date", ">=", now)
                .orderBy("date", "asc")
                .get(),
        ]);

        const toPlain = (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                date: (data.date as Timestamp).toDate().toISOString(),
                startAt: (data.startAt as Timestamp).toDate().toISOString(),
                endAt: data.endAt
                    ? (data.endAt as Timestamp).toDate().toISOString()
                    : undefined,
            };
        };

        return NextResponse.json({
            past: pastSnap.docs.map(toPlain),
            upcoming: upcomingSnap.docs.map(toPlain),
        });
    } catch (error) {
        console.error("[GET /sessions]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
