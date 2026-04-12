import { NextResponse } from "next/server";
import {
    adminAuth,
    adminDb,
    adminFieldValue,
} from "@/src/server/firebase/admin";
import { registerSchema } from "@/features/auth/validation";
import { ApiError, getErrorMessage } from "@/lib/api-error";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = registerSchema.parse(body);

        const user = await adminAuth.createUser({ email, password });

        const uid = user.uid;

        await adminAuth.setCustomUserClaims(uid, { role: "patient" });

        await adminDb.collection("users").doc(uid).set({
            role: "patient",
            profileComplete: false,
            balance: 0,
            createdAt: adminFieldValue.serverTimestamp(),
        });

        const customToken = await adminAuth.createCustomToken(uid);
        return NextResponse.json({ customToken }, { status: 201 });
    } catch (error: unknown) {
        console.error("register error:", error);

        if (
            error instanceof Object &&
            "code" in error &&
            error.code === "auth/email-already-exists"
        ) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        const errorMessage = getErrorMessage(error);

        return NextResponse.json(
            {
                message: errorMessage,
                code:
                    error instanceof Error && "code" in error
                        ? error.code
                        : undefined,
                status: 500,
            } as ApiError,
            { status: 500 },
        );
    }
}
