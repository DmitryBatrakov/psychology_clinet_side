import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const languagesList = [
    { id: "he", label: "Hebrew" },
    { id: "ru", label: "Русский" },
    { id: "en", label: "English" },
    { id: "ar", label: "Arabic" },
] as const;

type DateMode = "date" | "time" | "datetime" | "iso";

type TimestampLike = {
    toDate?: () => Date;
    _seconds?: number;
    seconds?: number;
};

type FormatDateInput = unknown;

type FormatDateOptions = {
    mode?: DateMode;
    locale?: string;
    fallback?: string;
};

export function formatDateTime(
    value: FormatDateInput,
    options: FormatDateOptions = {},
): string {
    const { mode = "datetime", locale = "he-IL", fallback = "-" } = options;

    const date = toDateSafe(value);
    if (!date || Number.isNaN(date.getTime())) return fallback;

    if (mode === "iso") return date.toISOString();

    if (mode === "date") {
        return new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(date);
    }

    if (mode === "time") {
        return new Intl.DateTimeFormat(locale, {
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    }

    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

function toDateSafe(value: unknown): Date | null {
    if (!value) return null;
    if (value instanceof Date) return value;

    if (typeof value === "string" || typeof value === "number") {
        const d = new Date(value);
        return Number.isNaN(d.getTime()) ? null : d;
    }

    if (typeof value === "object") {
        const v = value as TimestampLike;

        if (typeof v.toDate === "function") {
            const d = v.toDate();
            return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null;
        }

        if (typeof v._seconds === "number") {
            const d = new Date(v._seconds * 1000);
            return Number.isNaN(d.getTime()) ? null : d;
        }

        if (typeof v.seconds === "number") {
            const d = new Date(v.seconds * 1000);
            return Number.isNaN(d.getTime()) ? null : d;
        }
    }

    return null;
}
