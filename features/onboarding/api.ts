"use client";

import { auth } from "@/lib/firebase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchOnboarding(data: any) {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    const idToken = await user.getIdToken();

    const res = await fetch("/api/auth/onboarding", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error ?? "Onboarding failed");

    return json;
}
