export async function uploadDocument(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/specialist-application/upload-document", {
        method: "POST",
        body: formData,
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.message ?? "שגיאה בהעלאת קובץ");

    return json.url as string;
}
