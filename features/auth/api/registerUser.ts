"use client";

import { auth } from "@/lib/firebase";
import { signInWithCustomToken } from "firebase/auth";

export async function registerUser(email: string, password: string, inviteToken?: string) {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, inviteToken }),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(json?.message ?? "Register failed");
    }


    const { customToken } = json as { customToken: string };

    await signInWithCustomToken(auth, customToken);

    return json;
}