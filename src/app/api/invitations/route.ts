import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminFieldValue } from "@/src/server/firebase/admin";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { getErrorMessage } from "@/lib/api-error";
import { z } from "zod";
import { Resend } from "resend";
import { randomBytes } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

const bodySchema = z.object({
    email: z.string().email(),
});

export async function POST(req: NextRequest) {
    try {
        const decoded = await requireAuth(req);

        if (decoded.role !== "specialist") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();
        const { email } = bodySchema.parse(body);

        const specialistId = decoded.uid;

        const specialistDoc = await adminDb.collection("specialists").doc(specialistId).get();
        const specialistData = specialistDoc.data();
        const specialistName = specialistData
            ? `${specialistData.firstName} ${specialistData.lastName}`
            : "הפסיכולוג שלך";

        const token = randomBytes(32).toString("hex");

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await adminDb.collection("invitations").doc(token).set({
            email,
            specialistId,
            status: "pending",
            createdAt: adminFieldValue.serverTimestamp(),
            expiresAt,
        });

        const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
        const inviteUrl = `${base}/auth/register?invite=${token}&email=${encodeURIComponent(email)}`;

        await resend.emails.send({
            from: "MindSpace <noreply@mindspace.co.il>",
            to: email,
            subject: `${specialistName} מזמין אותך להצטרף ל-MindSpace`,
            html: `
                <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>שלום,</h2>
                    <p>${specialistName} הזמין אותך להצטרף לפלטפורמת MindSpace.</p>
                    <p>לחץ על הכפתור למטה כדי ליצור חשבון:</p>
                    <a href="${inviteUrl}" style="display: inline-block; background-color: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">
                        הצטרף עכשיו
                    </a>
                    <p style="color: #6b7280; font-size: 14px;">הקישור תקף ל-7 ימים.</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
        return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
    }
}
