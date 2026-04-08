import { auth } from "@/lib/firebase";

export async function deleteAvatar(photoUrl: string): Promise<void> {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Not authenticated");

    const idToken = await currentUser.getIdToken();
    const key = new URL(photoUrl).pathname.replace(/^\//, "");

    const res = await fetch("/api/user/delete-avatar", {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message ?? "Delete failed");
}
