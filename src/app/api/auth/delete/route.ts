import { ApiError, getErrorMessage } from "@/lib/api-error";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminAuth, adminDb } from "@/src/server/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;

        await adminDb.collection("users").doc(uid).delete();

        await adminAuth.deleteUser(uid);

        return NextResponse.json(
            {
                success: true,
                message: "Аккаунт успешно удалён",
            },
            { status: 200 },
        );
    } catch (error: unknown) {
        console.error("Deleting error:", error);

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
