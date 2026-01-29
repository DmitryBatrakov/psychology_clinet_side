import { NextResponse } from "next/server";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminDb } from "@/src/server/firebase/admin";

export async function GET(req: Request) {
  try {
    const decoded = await requireAuth(req);
    const uid = decoded.uid;

    const snap = await adminDb.collection("users").doc(uid).get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ uid, ...snap.data() }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const msg = e?.message ?? "Unknown error";
    const status = msg.includes("Missing Authorization") || msg.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json(
      { error: msg },
      { status }
    );
  }
}
