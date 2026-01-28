/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminDb } from "@/src/server/firebase/admin";

export async function GET(req: Request) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;

        const snap = await adminDb.collection("users").doc(uid).get();
        if (!snap.exists) {
            return NextResponse.json(
                { error: "User profile not found" },
                { status: 404 },
            );
        }

        const data = snap.data() as any;

        return NextResponse.json(
            {
                uid,
                email: decoded.email ?? null,
                profileComplete: data.profileComplete ?? false,
                role: data.role ?? "user",
            },
            { status: 200 },
        );
    } catch (e: any) {
        const msg = e?.message ?? "Unknown error";
        const status = msg.includes("Missing Authorization") ? 401 : 500;
        return NextResponse.json({ error: msg }, { status });
    }
}
