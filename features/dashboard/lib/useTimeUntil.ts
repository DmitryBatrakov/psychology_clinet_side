import { useState, useEffect } from "react";

export function useTimeUntil(
    isoStart: string | null | undefined,
    isoEnd: string | null | undefined,
    status: string | null | undefined,
): string {
    const [label, setLabel] = useState("");

    useEffect(() => {
        if (!isoStart || status === "completed" || status === "canceled") {
            setLabel("");
            return;
        }

        function compute() {
            const now = Date.now();
            const t1 = new Date(isoStart!).getTime();
            const t2 = isoEnd ? new Date(isoEnd).getTime() : null;

            if (isNaN(t1)) {
                setLabel("");
                return;
            }

            const start = t2 && !isNaN(t2) ? Math.min(t1, t2) : t1;
            const end = t2 && !isNaN(t2) ? Math.max(t1, t2) : null;

            if (end && now >= start && now < end) {
                setLabel("מתקיימת כעת");
                return;
            }

            const diff = Math.floor((start - now) / 1000);

            if (diff <= 0) {
                setLabel("");
                return;
            }

            const h = Math.floor(diff / 3600);
            const m = Math.floor((diff % 3600) / 60);
            const s = diff % 60;

            if (h > 0) {
                setLabel(`${m > 0 ? `דקות ${m} ` : ""} שעות ${h} `);
            } else if (m > 0) {
                setLabel(`דקות ${m} `);
            } else {
                setLabel(`שניות ${s} `);
            }
        }

        compute();
        const id = setInterval(compute, 1000);
        return () => clearInterval(id);
    }, [isoStart, isoEnd, status]);

    return label;
}
