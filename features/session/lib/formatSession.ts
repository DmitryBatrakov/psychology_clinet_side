export function formatSessionDate(iso: string) {
    const d = new Date(iso);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatSessionTime(iso: string) {
    return new Date(iso).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    });
}
