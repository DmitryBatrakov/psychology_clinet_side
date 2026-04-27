export const SESSION_STATUS_LABELS: Record<
    "upcoming" | "completed" | "canceled" | "pending",
    { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
    upcoming: { label: "קרובה", variant: "default" },
    completed: { label: "הושלמה", variant: "secondary" },
    canceled: { label: "בוטלה", variant: "destructive" },
    pending: { label: "ממתינה", variant: "outline" },
};
