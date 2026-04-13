/**
 * Returns [displayStart, displayEnd] in correct chronological order,
 * handling the case where startAt and endAt are stored swapped.
 */
export function getDisplayTimes(
    startAt: string,
    endAt?: string | null,
): [string, string | null] {
    const t1 = new Date(startAt).getTime();
    const t2 = endAt ? new Date(endAt).getTime() : null;

    if (t2 && t2 < t1) {
        return [endAt!, startAt];
    }

    return [startAt, endAt ?? null];
}
