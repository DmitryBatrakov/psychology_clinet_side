import { NextResponse } from "next/server";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminDb } from "@/src/server/firebase/admin";
import { ApiError, getErrorMessage } from "@/lib/api-error";

export async function GET(req: Request) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;

        const snap = await adminDb.collection("users").doc(uid).get();
        if (!snap.exists) {
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 },
            );
        }
        const data = snap.data();
        if (!data) {
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 },
            );
        }

        // Convert Firestore Timestamp to ISO string for birthDate
        let birthDate: string | null = null;
        if (data.birthDate) {
            if (
                data.birthDate.toDate &&
                typeof data.birthDate.toDate === "function"
            ) {
                // Firestore Timestamp
                birthDate = data.birthDate.toDate().toISOString();
            } else if (data.birthDate instanceof Date) {
                birthDate = data.birthDate.toISOString();
            } else if (typeof data.birthDate === "string") {
                birthDate = data.birthDate;
            }
        }

        return NextResponse.json(
            {
                uid,
                ...data,
                birthDate,
            },
            { status: 200 },
        );
    } catch (error: unknown) {
        console.error("Saving profile error:", error);

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
