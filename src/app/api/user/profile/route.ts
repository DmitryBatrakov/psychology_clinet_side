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
    return NextResponse.json(
      { error: e?.message ?? "Unauthorized" },
      { status: 401 }
    );
  }
}
