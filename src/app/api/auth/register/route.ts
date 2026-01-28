import { NextResponse } from "next/server";
import {
    adminAuth,
    adminDb,
    adminFieldValue,
} from "@/src/server/firebase/admin";
import { registerSchema } from "@/features/auth/validation";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = registerSchema.parse(body);

        const user = await adminAuth.createUser({ email, password });
        const uid = user.uid;

        await adminDb.collection("users").doc(uid).set({
            role: "user",
            profileComplete: false,
            balance: 0,
            createdAt: adminFieldValue.serverTimestamp(),
        });

        const customToken = await adminAuth.createCustomToken(uid);
        return NextResponse.json({ customToken }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        const status = e?.code === "auth/email-already-exists" ? 409 : 500;
        return NextResponse.json(
            { error: e?.message ?? "Unknown error" },
            { status },
        );
    }
}
