import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, R2_BUCKET } from "@/src/server/r2/client";
import { requireAuth } from "@/src/server/authToken/requireAuth";

export async function DELETE(req: Request) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;

        const { key } = await req.json();

        // Защита: пользователь может удалить только свой файл
        if (!key || !key.startsWith(`avatars/${uid}`)) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        await r2Client.send(
            new DeleteObjectCommand({
                Bucket: R2_BUCKET,
                Key: key,
            }),
        );

        return NextResponse.json({ message: "Deleted" }, { status: 200 });
    } catch (error: unknown) {
        console.error("Delete avatar error:", error);

        if (error instanceof Error && error.message.includes("Unauthorized")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }
}
