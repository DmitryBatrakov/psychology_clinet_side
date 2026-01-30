/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { requireAuth } from "@/src/server/authToken/requireAuth";
import { adminDb } from "@/src/server/firebase/admin";
import { ApiError, getErrorMessage } from "@/lib/api-error";

export async function GET(req: Request) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;

        const snap = await adminDb.collection("users").doc(uid).get();
        if (!snap.exists) {
            return NextResponse.json(
                { error: "User profile not found" },
                { status: 404 },
            );
        }

        const data = snap.data() as any;

        return NextResponse.json(
            {
                uid,
                email: decoded.email ?? null,
                profileComplete: data.profileComplete ?? false,
                role: data.role ?? "user",
            },
            { status: 200 },
        );
    } catch (error: unknown) {
        console.error('Google login error:', error);
        
        const errorMessage = getErrorMessage(error);
        
        return NextResponse.json(
          { 
            message: errorMessage,
            code: error instanceof Error && 'code' in error ? error.code : undefined,
            status: 500 
          } as ApiError,
          { status: 500 }
        );
      }
}
