import { NextResponse } from "next/server";
import { adminDb, adminFieldValue } from "@/src/server/firebase/admin";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { onboardingApiSchema } from "@/features/onboarding/validation";

export async function POST(req: Request) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;

        const body = await req.json();
        const data = onboardingApiSchema.parse(body);

        const birthDateAsDate = new Date(`${data.birthDate}T00:00:00.000Z`);

        await adminDb
            .collection("users")
            .doc(uid)
            .update({
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                birthDate: birthDateAsDate,
                gender: data.gender,
                languages: data.languages,
                photoUrl: data.photoUrl ?? null,

                profileComplete: true,
                updatedAt: adminFieldValue.serverTimestamp(),
            });

        return NextResponse.json({ ok: true }, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        const msg = e?.message ?? "Unknown error";
        const status = msg.includes("Missing Authorization") ? 401 : 400;
        return NextResponse.json({ error: msg }, { status });
    }
}
