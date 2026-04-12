import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, R2_BUCKET, R2_PUBLIC_URL } from "@/src/server/r2/client";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ message: "No file provided" }, { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { message: "Invalid file type. Only JPEG, PNG, WebP, PDF allowed." },
                { status: 400 },
            );
        }

        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { message: "File too large. Max 10MB." },
                { status: 400 },
            );
        }

        const ext = file.type === "application/pdf" ? "pdf" : file.type.split("/")[1];
        const key = `specialist-documents/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const buffer = Buffer.from(await file.arrayBuffer());

        await r2Client.send(
            new PutObjectCommand({
                Bucket: R2_BUCKET,
                Key: key,
                Body: buffer,
                ContentType: file.type,
            }),
        );

        const publicUrl = `${R2_PUBLIC_URL}/${key}`;

        return NextResponse.json({ url: publicUrl }, { status: 200 });
    } catch (error: unknown) {
        console.error("Upload document error:", error);
        return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }
}
