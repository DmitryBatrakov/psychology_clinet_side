import { auth } from "@/lib/firebase";

export async function uploadAvatar(file: File): Promise<{ url: string }> {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Not authenticated");

    const idToken = await currentUser.getIdToken();

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/user/upload-avatar", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
        body: formData,
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message ?? "Upload failed");

    return json;
}
