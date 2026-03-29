export const addMonths = (date: Date, months: number) => {
    const next = new Date(date);
    next.setMonth(next.getMonth() + months);
    return next;
};

export const toDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const startOfWeekSunday = (date: Date): Date => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    start.setHours(0, 0, 0, 0);
    return start;
};

export const addDays = (date: Date, days: number): Date => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
};

export const formatWeekRange = (start: Date, end: Date) => {
    const fmt = new Intl.DateTimeFormat("he-IL", {
        day: "2-digit",
        month: "2-digit",
    });
    return `${fmt.format(start)} - ${fmt.format(end)}`;
};

export const formatWeekday = (date: Date) => {
    const weekday = new Intl.DateTimeFormat("he-IL", {
        weekday: "long",
    }).format(date);
    return weekday;
};

export const formatDayMonth = (date: Date) =>
    new Intl.DateTimeFormat("he-IL", {
        day: "numeric",
        month: "short",
    }).format(date);
