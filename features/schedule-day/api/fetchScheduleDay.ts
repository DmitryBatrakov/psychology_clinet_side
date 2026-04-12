import { auth } from "@/lib/firebase";
import type { ScheduleDayItem } from "@/features/schedule-day/model/types";

export async function fetchScheduleDay(): Promise<{ items: ScheduleDayItem[] }> {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User not authenticated");
    }

    const idToken = await user.getIdToken();

    const res = await fetch("/api/specialist/schedule-day", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(json?.error ?? "Failed to load schedule");
    }

    if (!json) {
        throw new Error("Invalid response format");
    }

    return json;
}
