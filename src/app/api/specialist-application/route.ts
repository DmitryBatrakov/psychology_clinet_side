import { createSpecialistApplicationSchema } from "@/features/specialist-application/validation";
import { adminDb, adminFieldValue } from "@/src/server/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parsed = createSpecialistApplicationSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    errors: parsed.error.flatten(),
                },
                { status: 400 },
            );
        }

        console.log("result from route", parsed);

        await adminDb
            .collection("specialistApplications")
            .add({
                ...parsed.data,
                approved: false,
                approvedAt: null,
                createdAt: adminFieldValue.serverTimestamp(),
            });
        console.log("application submitted successfully");

        return NextResponse.json(
            { message: "Application submitted successfully" },
            { status: 200 },
        );
    } catch (error) {
        console.error("Failed to submit application", error);
        return NextResponse.json(
            { message: "Failed to submit application" },
            { status: 500 },
        );
    }
}
