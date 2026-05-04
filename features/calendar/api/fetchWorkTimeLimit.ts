"use client";
import { auth } from "@/lib/firebase";
import { WorkTimeLimit } from "../model/types";

export async function fetchWorkTimeLimit(): Promise<{ data: WorkTimeLimit } | null> {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    const idToken = await user.getIdToken();

    const res = await fetch("/api/specialist/work-time-limit", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error ?? "Failed to fetch work time limit");

    return json as { data: WorkTimeLimit } | null;
}
