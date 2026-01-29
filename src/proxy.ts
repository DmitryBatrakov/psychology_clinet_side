// frontend/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function proxy(_req: NextRequest) {
    // const { pathname } = req.nextUrl; // TODO: Uncomment when implementing route protection

    // 1) ГОСТЬ
    //  if ((pathname.startsWith("/account") || pathname === "/auth/onboarding")) {
    //      return NextResponse.redirect(new URL("/auth/login", req.url));
    //  }

    // 2) АВТОРИЗОВАН
    // if (isLoggedIn && (pathname === "/auth/login" || pathname === "/auth/register")) {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/account/:path*",
        "/auth/login",
        "/auth/register",
        "/auth/onboarding",
    ],
};
