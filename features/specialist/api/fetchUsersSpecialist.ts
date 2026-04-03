import { auth } from "@/lib/firebase";

export async function fetchUsersSpecialist(specialistIds: string[]) {
    if (specialistIds.length === 0) {
        return [];
    }

    const user = auth.currentUser;

    if (!user) {
        throw new Error("User not authenticated");
    }

    const idToken = await user.getIdToken();
    const params = new URLSearchParams({
        ids: specialistIds.join(","),
    });

    const res = await fetch(`/api/user/specialists?${params.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
    const json = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(json?.error ?? "Failed to load specialists");
    }

    if (!json) {
        throw new Error("Invalid response format");
    }

    return json;
}
