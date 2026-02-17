import { updateProfileApiSchema, type UpdateProfileApiValues } from "@/features/user/validation";
import { ApiError, getErrorMessage } from "@/lib/api-error";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminDb, adminFieldValue } from "@/src/server/firebase/admin";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type ErrorWithCode = Error & { code?: string };

export async function PATCH(req: Request) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;

        const userRef = adminDb.collection("users").doc(uid);
        const snap = await userRef.get();

        if (!snap.exists) {
            return NextResponse.json(
                { message: "User profile not found" },
                { status: 404 },
            );
        }

        const body = await req.json();
        const data = updateProfileApiSchema.parse(body);

        // Обновляем только то, что реально пришло
        const updatePayload: Partial<UpdateProfileApiValues> & {
            updatedAt: ReturnType<typeof adminFieldValue.serverTimestamp>;
          } = {
            updatedAt: adminFieldValue.serverTimestamp(),
          };

        if (data.firstName !== undefined)
            updatePayload.firstName = data.firstName;
        if (data.lastName !== undefined) updatePayload.lastName = data.lastName;
        if (data.phoneNumber !== undefined)
            updatePayload.phoneNumber = data.phoneNumber;

        if (data.birthDate !== undefined)
            updatePayload.birthDate = data.birthDate; // уже Date после zod.transform
        if (data.gender !== undefined) updatePayload.gender = data.gender;
        if (data.languages !== undefined)
            updatePayload.languages = data.languages;

        if (data.photoUrl !== undefined) updatePayload.photoUrl = data.photoUrl;

        updatePayload.updatedAt = adminFieldValue.serverTimestamp();

        await userRef.update(updatePayload);

        return NextResponse.json(
            { message: "Profile updated successfully" },
            { status: 200 },
        );
    } catch (error: unknown) {
        console.error("Updating profile error:", error);

        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: "Validation error", errors: error.issues },
                { status: 400 },
            );
        }

        if (error instanceof Error && error.message.includes("Unauthorized")) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 },
            );
        }

        const errorMessage = getErrorMessage(error);

        const code = (error as ErrorWithCode)?.code;

        return NextResponse.json({ message: errorMessage, code } as ApiError, {
            status: 500,
        });
    }
}
