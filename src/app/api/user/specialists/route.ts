import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminDb } from "@/src/server/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

function chunkArray<T>(items: T[], size: number) {
    const chunks: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
        chunks.push(items.slice(i, i + size));
    }
    return chunks;
}


export async function GET(req: NextRequest) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;
        const idsParam = req.nextUrl.searchParams.get("ids") ?? "";
        const requestedIds = [
            ...new Set(
                idsParam
                    .split(",")
                    .map((id) => id.trim())
                    .filter(Boolean),
            ),
        ];

        if (requestedIds.length === 0) {
            return NextResponse.json([]);
        }

        // Validate requested ids belong to this user sessions.
        const requestedChunks = chunkArray(requestedIds, 30);
        const sessionSnaps = await Promise.all(
            requestedChunks.map((idsChunk) =>
                adminDb
                    .collection("sessions")
                    .where("userId", "==", uid)
                    .where("specialistId", "in", idsChunk)
                    .get(),
            ),
        );
        const verifiedIds = [
            ...new Set(
                sessionSnaps.flatMap((snap) =>
                    snap.docs.map((doc) => doc.data().specialistId as string),
                ),
            ),
        ];

        if (verifiedIds.length === 0) {
            return NextResponse.json([]);
        }

        const specialistChunks = chunkArray(verifiedIds, 30);
        const specialistsSnaps = await Promise.all(
            specialistChunks.map((idsChunk) =>
                adminDb
                    .collection("specialists")
                    .where("__name__", "in", idsChunk)
                    .get(),
            ),
        );

        const specialists = specialistsSnaps.flatMap((snap) =>
            snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })),
        );

        return NextResponse.json(specialists);
    } catch (error) {
        console.error("[GET /specialists]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}