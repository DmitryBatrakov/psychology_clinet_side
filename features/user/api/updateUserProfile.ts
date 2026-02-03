import { auth } from "@/lib/firebase";
import type { UpdateProfileApiInput } from "@/features/user/validation";

export async function updateUserProfile(data: Partial<UpdateProfileApiInput>) {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    const idToken = await user.getIdToken();

    const res = await fetch("/api/user/update-profile", {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(json?.message ?? "Failed to update profile");
    }

    return json;
}
