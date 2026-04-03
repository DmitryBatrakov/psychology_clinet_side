import { useMemo, useState } from "react";
import { getAvailableHourlySlotsForDate } from "../lib/availability";
import { cn } from "@/lib/utils";
import {
    Field,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SessionType } from "@/features/specialist/model/types";
import {
    addDays,
    addMonths,
    formatDayMonth,
    formatWeekday,
    formatWeekRange,
    startOfWeekSunday,
    toDateKey,
} from "../lib/utils";
import { MeetingFormat } from "@/features/session/model/types";
import { ALLOWED_MEETING_FORMATS } from "@/features/catalog/model/catalogEnums";
import { useSpecialistSchedule } from "../hooks/useSpecialistSchedule";

export const SessionDatePicker = ({
    specialistId,
    sessionType,
    meetingFormat,
}: {
    specialistId: string;
    sessionType: SessionType[];
    meetingFormat: MeetingFormat;
}) => {
    const scheduleQuery = useSpecialistSchedule(specialistId);
    const scheduleRule = scheduleQuery.data?.rule ?? null;
    const scheduleOverrides = scheduleQuery.data?.overrides ?? [];
    const sessions = scheduleQuery.data?.sessions ?? [];
    const tomorrow = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        date.setHours(0, 0, 0, 0);
        return date;
    }, []);

    const horizonMonths = scheduleRule?.displayHorizonMonths ?? 1;
    const maxDate = useMemo(
        () => addMonths(tomorrow, horizonMonths),
        [horizonMonths, tomorrow],
    );

    const weeks = useMemo(() => {
        const start = startOfWeekSunday(tomorrow);
        const result: Array<{ start: Date; end: Date; days: Date[] }> = [];
        let cursor = new Date(start);

        while (cursor <= maxDate) {
            const weekStart = new Date(cursor);
            const weekEnd = addDays(weekStart, 6);
            const days = Array.from({ length: 7 }, (_, index) =>
                addDays(weekStart, index),
            ).filter((day) => day >= tomorrow && day <= maxDate);

            if (days.length > 0) {
                result.push({ start: weekStart, end: weekEnd, days });
            }
            cursor = addDays(weekStart, 7);
        }

        return result;
    }, [maxDate, tomorrow]);

    const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(() =>
        weeks[0]?.days[0] ? toDateKey(weeks[0].days[0]) : toDateKey(tomorrow),
    );

    const selectedWeek = weeks[selectedWeekIndex];
    const selectedWeekDays = selectedWeek?.days ?? [];

    const daySlotsMap = useMemo(() => {
        const entries = selectedWeekDays.map((day) => {
            const dateKey = toDateKey(day);
            const slots = getAvailableHourlySlotsForDate({
                specialistId,
                date: dateKey,
                rules: scheduleRule ? [scheduleRule] : [],
                overrides: scheduleOverrides,
                sessions,
            });
            return [dateKey, slots] as const;
        });

        return new Map(entries);
    }, [selectedWeekDays, specialistId, scheduleOverrides, sessions, scheduleRule]);

    const slots = useMemo(() => {
        if (!scheduleRule) return [];

        return daySlotsMap.get(selectedDate) ?? [];
    }, [daySlotsMap, selectedDate, scheduleRule]);

    if (scheduleQuery.isPending) {
        return (
            <div className="flex flex-col items-start justify-start max-w-md p-4 border border-gray-200 rounded-2xl gap-2">
                <p className="text-sm text-muted-foreground">טוען זמינות...</p>
            </div>
        );
    }

    if (scheduleQuery.isError) {
        return (
            <div className="flex flex-col items-start justify-start max-w-md p-4 border border-gray-200 rounded-2xl gap-2">
                <p className="text-sm text-destructive">
                    שגיאה בטעינת לוח הזמנים. נסה שוב מאוחר יותר.
                </p>
            </div>
        );
    }

    if (!scheduleRule) {
        return (
            <div className="flex flex-col items-start justify-start max-w-md p-4 border border-gray-200 rounded-2xl gap-2">
                <p className="text-sm text-destructive">
                    אין לוח זמנים פעיל למומחה
                </p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <h3 className="text-2xl font-semibold text-center">
                בחרו יום ושעת מפגש
            </h3>

            <div className="flex flex-col  items-start gap-10 overflow-x-auto pb-1 w-full">
                <div className="w-full flex items-start justify-start gap-25 ">
                    <div className="flex items-center justify-center">
                        <FieldSet className="w-full max-w-xs">
                            <FieldLegend variant="label">
                                בחרו סוג שיחה
                            </FieldLegend>
                            <RadioGroup defaultValue={sessionType[0]}>
                                {sessionType.map((type) => (
                                    <Field
                                        key={type}
                                        className=""
                                        orientation="horizontal"
                                    >
                                        <RadioGroupItem
                                            id={type}
                                            value={type}
                                        />
                                        <FieldLabel htmlFor={type}>
                                            {type}
                                        </FieldLabel>
                                    </Field>
                                ))}
                            </RadioGroup>
                        </FieldSet>
                    </div>
                    <div className="flex items-center justify-center">
                        <FieldSet className="w-full max-w-xs">
                            <FieldLegend variant="label">
                                בחרו סוג פגישה
                            </FieldLegend>
                            <RadioGroup defaultValue={meetingFormat}>
                                {ALLOWED_MEETING_FORMATS.map((format) => (
                                    <Field
                                        key={format}
                                        className=""
                                        orientation="horizontal"
                                    >
                                        <RadioGroupItem
                                            id={format}
                                            value={format}
                                        />
                                        <FieldLabel htmlFor={format}>
                                            {format}
                                        </FieldLabel>
                                    </Field>
                                ))}
                            </RadioGroup>
                        </FieldSet>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3 max-w-4xl">
                    <div className="py-4 flex gap-2 items-start justify-start overflow-auto">
                        {weeks.map((week, index) => (
                            <button
                                key={`${toDateKey(week.start)}-${toDateKey(week.end)}`}
                                type="button"
                                className={cn(
                                    "shrink-0 rounded-xl border px-4 py-2 text-sm transition-colors font-medium",
                                    selectedWeekIndex === index
                                        ? "border-white bg-blue-500 text-white "
                                        : "bg-muted/40 text-muted-foreground hover:text-foreground",
                                )}
                                onClick={() => {
                                    setSelectedWeekIndex(index);
                                    const firstDay = week.days[0];
                                    if (firstDay)
                                        setSelectedDate(toDateKey(firstDay));
                                }}
                            >
                                {formatWeekRange(week.start, week.end)}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2 pb-3 overflow-x-auto rounded-2xl">
                        {selectedWeekDays.map((day) => {
                            const dateKey = toDateKey(day);
                            const daySlots = daySlotsMap.get(dateKey) ?? [];
                            const isActive = dateKey === selectedDate;

                            return (
                                <button
                                    key={dateKey}
                                    type="button"
                                    className={cn(
                                        "rounded-xl px-2 py-2 text-center transition-colors w-full min-w-32 font-medium",
                                        isActive
                                            ? "bg-blue-500/30 text-black"
                                            : "hover:bg-accent",
                                        daySlots.length === 0 && "opacity-50",
                                    )}
                                    onClick={() => setSelectedDate(dateKey)}
                                >
                                    <p className="text-sm font-medium">
                                        {formatWeekday(day)}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDayMonth(day)}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    <div className="space-y-2 w-full max-w-2xl">
                        <p className="text-sm text-muted-foreground">
                            ירושלים (GMT+2),{" "}
                            {new Date().toLocaleTimeString("he-IL", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>

                        {slots.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                אין שעות פנויות בתאריך שנבחר
                            </p>
                        ) : (
                            <div className="grid grid-cols-3 gap-2">
                                {slots.map((slot) => (
                                    <button
                                        key={`${selectedDate}-${slot.startTime}-${slot.endTime}`}
                                        type="button"
                                        className="rounded-xl bg-muted/50 px-3 py-2 text-sm hover:bg-accent transition-colors"
                                    >
                                        {slot.startTime}
                                    </button>
                                ))}
                            </div>
                        )}

                        <p className="text-sm text-muted-foreground">
                            אונליין, טיפול פרונטלי, 55 דקות
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
