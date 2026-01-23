// frontend/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const session = req.cookies.get("session");
    const isLoggedIn = session?.value === "true";

    // 1) ГОСТЬ
     if (!isLoggedIn && (pathname.startsWith("/account") || pathname === "/onboarding")) {
         return NextResponse.redirect(new URL("/login", req.url));
     }

    // 2) АВТОРИЗОВАН
    if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/account/:path*",
        "/login",
        "/register",
        "/onboarding",
    ],
};
