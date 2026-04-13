import type { ScheduleDayItem } from "@/features/dashboard/model/types";

/**
 * Returns the earliest session that hasn't ended yet.
 * Handles the case where startAt > endAt (swapped fields) by using the
 * later of the two as the actual end time.
 */
export function findNextSession(items: ScheduleDayItem[] | undefined): ScheduleDayItem | null {
    if (!items?.length) return null;

    const now = Date.now();

    return (
        items.find(({ session }) => {
            if (session.status === "completed" || session.status === "canceled") return false;

            const t1 = new Date(session.startAt).getTime();
            const t2 = session.endAt ? new Date(session.endAt).getTime() : null;

            if (isNaN(t1)) return false;

            // Use the later timestamp as the real end so swapped fields still work
            const actualEnd = t2 && !isNaN(t2) ? Math.max(t1, t2) : null;

            if (actualEnd) return actualEnd > now;
            return t1 > now;
        }) ?? null
    );
}
