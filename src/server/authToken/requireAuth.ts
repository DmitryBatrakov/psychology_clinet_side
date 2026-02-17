import "server-only";
import { adminAuth } from "@/src/server/firebase/admin";

export async function requireAuth(req: Request) {
    const header = req.headers.get("authorization") || "";
    const match = header.match(/^Bearer (.+)$/i);
    const token = match?.[1];

    if (!token) {
        throw new Error("Missing Authorization: Bearer token");
    }

    const decoded = await adminAuth.verifyIdToken(token);
    return decoded;
}
