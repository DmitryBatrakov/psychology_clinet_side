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
    } catch (error: unknown) {
        if (error instanceof Object && "code" in error && error.code === "auth/session-cookie-expired") {
            const refreshUrl = new URL("/auth/refresh-session", _req.url);
            refreshUrl.searchParams.set("redirect", _req.nextUrl.pathname);
            return NextResponse.redirect(refreshUrl);
        }
        return NextResponse.redirect(new URL("/auth/login", _req.url));
    }
}

export const config = {
    matcher: ["/account/:path*"],
};


{/*

    import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "./server/firebase/admin";

export async function middleware(req: NextRequest) {
    const session = req.cookies.get("__session")?.value;
    const pathname = req.nextUrl.pathname;

    if (!session) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
        const decoded = await adminAuth.verifySessionCookie(session, true);
        const role = decoded.role as string | undefined;

        // редирект по роли с корня
        if (pathname === "/") {
            if (role === "specialist") {
                return NextResponse.redirect(new URL("/specialist/dashboard", req.url));
            }
            return NextResponse.redirect(new URL("/patient/dashboard", req.url));
        }

        // защита кабинета специалиста от пациента
        if (pathname.startsWith("/specialist") && role !== "specialist") {
            return NextResponse.redirect(new URL("/patient/dashboard", req.url));
        }

        // защита кабинета пациента от специалиста
        if (pathname.startsWith("/patient") && role === "specialist") {
            return NextResponse.redirect(new URL("/specialist/dashboard", req.url));
        }

        return NextResponse.next();

    } catch (error: unknown) {
        if (
            error instanceof Object &&
            "code" in error &&
            error.code === "auth/session-cookie-expired"
        ) {
            const refreshUrl = new URL("/auth/refresh-session", req.url);
            refreshUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(refreshUrl);
        }
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: ["/patient/:path*", "/specialist/:path*"],
};

*/}
