"use client";
import { auth } from "@/lib/firebase";
import { CreateSessionInput } from "@/features/calendar/model/types";

export async function createSession(data: CreateSessionInput) {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    const idToken = await user.getIdToken();

    const res = await fetch("/api/specialist/sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error ?? "Failed to create session");

    return json as { sessionId: string };
}
