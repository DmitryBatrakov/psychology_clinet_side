import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "./server/firebase/admin";


export async function proxy(_req: NextRequest) {
    const session = _req.cookies.get("__session")?.value;

    if (!session) {
        return NextResponse.redirect(new URL("/auth/login", _req.url));
    }

    try {
        await adminAuth.verifySessionCookie(session, true);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/auth/login", _req.url));
    }
}

export const config = {
    matcher: ["/account/:path*"],
};
