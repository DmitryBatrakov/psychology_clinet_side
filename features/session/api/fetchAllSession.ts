import { auth } from "@/lib/firebase";

export async function fetchAllSession() {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User not authenticated");
    }

    const idToken = await user.getIdToken();

    const res = await fetch("/api/user/sessions", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(json?.error ?? "Failed to load session");
    }

    return json;
}
