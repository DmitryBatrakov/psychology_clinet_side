import type {
    ScheduleOverride,
    ScheduleRule,
    TimeInterval,
    WeekdayKey,
} from "@/features/slot/model/type";
import type { SessionDTO } from "@/features/session/model/types";

export interface AvailableSlot {
    startTime: string;
    endTime: string;
}

const WEEKDAY_BY_INDEX: WeekdayKey[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

const timeToMinutes = (value: string): number => {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
};

const minutesToTime = (value: number): string => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const normalizeIntervals = (intervals: TimeInterval[]): TimeInterval[] => {
    const sorted = [...intervals]
        .filter((interval) => timeToMinutes(interval.startTime) < timeToMinutes(interval.endTime))
        .sort(
            (a, b) =>
                timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
        );

    if (sorted.length === 0) return [];

    const merged: TimeInterval[] = [sorted[0]];
    for (let i = 1; i < sorted.length; i += 1) {
        const current = sorted[i];
        const last = merged[merged.length - 1];
        const currentStart = timeToMinutes(current.startTime);
        const currentEnd = timeToMinutes(current.endTime);
        const lastEnd = timeToMinutes(last.endTime);

        if (currentStart <= lastEnd) {
            last.endTime = minutesToTime(Math.max(lastEnd, currentEnd));
        } else {
            merged.push(current);
        }
    }

    return merged;
};

const subtractBlock = (
    intervals: TimeInterval[],
    blockStartTime: string,
    blockEndTime: string
): TimeInterval[] => {
    const blockStart = timeToMinutes(blockStartTime);
    const blockEnd = timeToMinutes(blockEndTime);
    if (blockStart >= blockEnd) return intervals;

    const result: TimeInterval[] = [];

    for (const interval of intervals) {
        const start = timeToMinutes(interval.startTime);
        const end = timeToMinutes(interval.endTime);

        if (blockEnd <= start || blockStart >= end) {
            result.push(interval);
            continue;
        }

        if (blockStart > start) {
            result.push({
                startTime: interval.startTime,
                endTime: minutesToTime(blockStart),
            });
        }

        if (blockEnd < end) {
            result.push({
                startTime: minutesToTime(blockEnd),
                endTime: interval.endTime,
            });
        }
    }

    return normalizeIntervals(result);
};

const getWeekdayKey = (date: Date): WeekdayKey => WEEKDAY_BY_INDEX[date.getDay()];

const applyOverrideToIntervals = (
    baseIntervals: TimeInterval[],
    override?: ScheduleOverride
): TimeInterval[] => {
    if (!override) return normalizeIntervals(baseIntervals);

    if (override.type === "custom") {
        return normalizeIntervals(override.customIntervals ?? []);
    }

    if (override.type === "add") {
        return normalizeIntervals([...baseIntervals, ...(override.addIntervals ?? [])]);
    }

    if (override.type === "block") {
        if (override.blockAllDay) return [];
        if (override.blockStartTime && override.blockEndTime) {
            return subtractBlock(baseIntervals, override.blockStartTime, override.blockEndTime);
        }
    }

    return normalizeIntervals(baseIntervals);
};

const getDateKeyInTimezone = (date: Date, timeZone: string): string => {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date);

    const year = parts.find((p) => p.type === "year")?.value ?? "1970";
    const month = parts.find((p) => p.type === "month")?.value ?? "01";
    const day = parts.find((p) => p.type === "day")?.value ?? "01";

    return `${year}-${month}-${day}`;
};

const filterBookedIntervals = (
    intervals: TimeInterval[],
    sessions: SessionDTO[],
    dateKey: string,
    timeZone: string
): TimeInterval[] => {
    const busy = sessions
        .filter((session) => session.status !== "canceled")
        .filter(
            (session) =>
                getDateKeyInTimezone(new Date(session.startAt), timeZone) === dateKey
        )
        .map((session) => {
            const start = new Date(session.startAt);
            const end = session.endAt ? new Date(session.endAt) : null;
            const startParts = new Intl.DateTimeFormat("en-GB", {
                timeZone,
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }).format(start);
            const endParts = end
                ? new Intl.DateTimeFormat("en-GB", {
                      timeZone,
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                  }).format(end)
                : null;

            return endParts
                ? { startTime: startParts, endTime: endParts }
                : null;
        })
        .filter((v): v is TimeInterval => Boolean(v));

    return busy.reduce(
        (available, blocked) =>
            subtractBlock(available, blocked.startTime, blocked.endTime),
        normalizeIntervals(intervals)
    );
};

const splitToHourlySlots = (intervals: TimeInterval[]): AvailableSlot[] => {
    const slots: AvailableSlot[] = [];

    for (const interval of intervals) {
        const start = timeToMinutes(interval.startTime);
        const end = timeToMinutes(interval.endTime);
        const alignedStart = Math.ceil(start / 60) * 60;

        for (let cursor = alignedStart; cursor + 60 <= end; cursor += 60) {
            slots.push({
                startTime: minutesToTime(cursor),
                endTime: minutesToTime(cursor + 60),
            });
        }
    }

    return slots;
};

export const getAvailableHourlySlotsForDate = ({
    specialistId,
    date,
    rules,
    overrides,
    sessions,
}: {
    specialistId: string;
    date: string;
    rules: ScheduleRule[];
    overrides: ScheduleOverride[];
    sessions: SessionDTO[];
}): AvailableSlot[] => {
    const rule = rules.find((item) => item.specialistId === specialistId && item.isActive);
    if (!rule) return [];

    const selectedDate = new Date(`${date}T12:00:00`);
    const weekday = getWeekdayKey(selectedDate);
    const baseIntervals = rule.weekdayIntervals[weekday] ?? [];
    const override = overrides.find(
        (item) => item.specialistId === specialistId && item.date === date
    );

    const intervalsWithOverride = applyOverrideToIntervals(baseIntervals, override);
    const freeIntervals = filterBookedIntervals(
        intervalsWithOverride,
        sessions,
        date,
        rule.timeZone
    );

    return splitToHourlySlots(freeIntervals);
};
