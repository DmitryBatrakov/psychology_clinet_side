export type SessionState = "upcoming" | "ongoing" | "completed" | "canceled" | "past";

export function resolveSessionState(
    status: string,
    startAt: string,
    endAt?: string | null,
): SessionState {
    if (status === "completed") return "completed";
    if (status === "canceled") return "canceled";

    const now = Date.now();
    const t1 = new Date(startAt).getTime();
    const t2 = endAt ? new Date(endAt).getTime() : null;
    const actualStart = t2 && !isNaN(t2) ? Math.min(t1, t2) : t1;
    const actualEnd   = t2 && !isNaN(t2) ? Math.max(t1, t2) : null;

    if (actualEnd) {
        if (now >= actualStart && now < actualEnd) return "ongoing";
        if (now >= actualEnd) return "past";
    } else if (now >= actualStart) {
        return "past";
    }

    return "upcoming";
}

export const SESSION_BADGE: Record<
    Exclude<SessionState, "upcoming">,
    { label: string; variant: "secondary" | "destructive" | "outline" | "default" }
> = {
    ongoing:   { label: "מתקיימת כעת", variant: "default"     },
    completed: { label: "הסתיימה",     variant: "secondary"   },
    canceled:  { label: "בוטלה",       variant: "destructive" },
    past:      { label: "הסתיימה",     variant: "secondary"   },
};
