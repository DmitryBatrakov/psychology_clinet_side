import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminAuth, adminDb } from "@/src/server/firebase/admin";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const decoded = await requireAuth(req);
    const uid = decoded.uid;

    await adminDb.collection("users").doc(uid).delete();

    await adminAuth.deleteUser(uid);

    return NextResponse.json({ 
      success: true, 
      message: "Аккаунт успешно удалён" 
    }, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { error: "Не удалось удалить аккаунт" },
      { status: 500 }
    );
  }
}
