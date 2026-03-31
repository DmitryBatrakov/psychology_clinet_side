import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "./server/firebase/admin";


export async function proxy(_req: NextRequest) {
    const session = _req.cookies.get("__session")?.value;

    if (!session) {
        return NextResponse.redirect(new URL("/auth/login", _req.url));
    }

    // Быстрая проверка — просто декодируем без верификации подписи
    try {
        const [, payload] = session.split(".");
        const decoded = JSON.parse(atob(payload));
        
        if (decoded.exp * 1000 < Date.now()) {
            return NextResponse.redirect(new URL("/auth/login", _req.url));
        }
    } catch {
        return NextResponse.redirect(new URL("/auth/login", _req.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        "/account/:path*",
    ],
};
