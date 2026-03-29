import type {
    ScheduleOverride,
    ScheduleRule,
    WeekdayIntervals,
} from "@/features/slot/model/type";

const defaultWeekTemplate: WeekdayIntervals = {
    sunday: [],
    monday: [{ startTime: "09:00", endTime: "13:00" }],
    tuesday: [{ startTime: "10:00", endTime: "14:00" }],
    wednesday: [{ startTime: "09:00", endTime: "12:00" }],
    thursday: [{ startTime: "11:00", endTime: "16:00" }],
    friday: [{ startTime: "09:00", endTime: "12:00" }],
    saturday: [],
};

const extendedWeekTemplate: WeekdayIntervals = {
    sunday: [{ startTime: "10:00", endTime: "13:00" }],
    monday: [
        { startTime: "08:30", endTime: "12:30" },
        { startTime: "14:00", endTime: "17:00" },
    ],
    tuesday: [{ startTime: "09:00", endTime: "15:00" }],
    wednesday: [{ startTime: "08:30", endTime: "13:30" }],
    thursday: [
        { startTime: "10:00", endTime: "13:00" },
        { startTime: "15:00", endTime: "18:00" },
    ],
    friday: [{ startTime: "09:00", endTime: "12:00" }],
    saturday: [],
};

export const scheduleRulesMock: ScheduleRule[] = [
    {
        id: "rule-spec-1",
        specialistId: "spec-1",
        type: "weekly",
        timeZone: "Asia/Jerusalem",
        weekdayIntervals: defaultWeekTemplate,
        isActive: true,
        displayHorizonMonths: 3,
        createdAt: new Date("2026-02-01T08:00:00.000Z"),
        updatedAt: new Date("2026-02-01T08:00:00.000Z"),
    },
    {
        id: "rule-spec-2",
        specialistId: "spec-2",
        type: "weekly",
        timeZone: "Asia/Jerusalem",
        weekdayIntervals: extendedWeekTemplate,
        isActive: true,
        displayHorizonMonths: 2,
        createdAt: new Date("2026-02-01T08:00:00.000Z"),
        updatedAt: new Date("2026-02-15T08:00:00.000Z"),
    },
];

export const scheduleOverridesMock: ScheduleOverride[] = [
    // spec-2: full-day block
    {
        id: "override-spec-2-2026-03-10",
        specialistId: "spec-2",
        date: "2026-03-10",
        type: "block",
        reason: "Vacation",
        blockAllDay: true,
        createdAt: new Date("2026-03-01T08:00:00.000Z"),
        updatedAt: new Date("2026-03-01T08:00:00.000Z"),
    },
    // spec-2: partial block (subtract from weekly)
    {
        id: "override-spec-2-2026-03-17",
        specialistId: "spec-2",
        date: "2026-03-17",
        type: "block",
        reason: "Conference",
        blockStartTime: "10:30",
        blockEndTime: "12:00",
        createdAt: new Date("2026-03-05T08:00:00.000Z"),
        updatedAt: new Date("2026-03-05T08:00:00.000Z"),
    },
    // spec-2: full replacement for that date
    {
        id: "override-spec-2-2026-04-02",
        specialistId: "spec-2",
        date: "2026-04-02",
        type: "custom",
        reason: "Special schedule",
        customIntervals: [
            { startTime: "12:00", endTime: "15:00" },
            { startTime: "16:00", endTime: "18:00" },
        ],
        createdAt: new Date("2026-03-20T08:00:00.000Z"),
        updatedAt: new Date("2026-03-20T08:00:00.000Z"),
    },
    // spec-2: add intervals to weekly day
    {
        id: "override-spec-2-2026-04-14",
        specialistId: "spec-2",
        date: "2026-04-14",
        type: "add",
        reason: "Extra evening hours",
        addIntervals: [{ startTime: "18:30", endTime: "20:00" }],
        createdAt: new Date("2026-03-25T08:00:00.000Z"),
        updatedAt: new Date("2026-03-25T08:00:00.000Z"),
    },
];
