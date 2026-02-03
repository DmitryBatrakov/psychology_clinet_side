import { auth } from "@/lib/firebase";

export async function fetchUserData() {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    const idToken = await user.getIdToken();

    const res = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(json?.error ?? "Failed to load user profile");
    }

    return json;
}