import { adminAuth } from "@/src/server/firebase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { idToken } = await request.json();

    if (!idToken) {
        return NextResponse.json({ error: "No token" }, { status: 400 });
    }


    await adminAuth.verifyIdToken(idToken);

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
        expiresIn,
    });

    const cookieStore = await cookies();
    cookieStore.set("__session", sessionCookie, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn / 1000,
    });

    return NextResponse.json({ success: true });
}