import { getGaps } from '@/features/calendar/lib/halpers';
import { mockSchedule } from '@/features/calendar/model/mockSchedule';
import { toDateKey } from '@/lib/func/to-date-key/toDateKey';

export type TimeSlot = { startHour: number; endHour: number };

// SWAP POINT: replace with ScheduleRule fetched from the API
export const MOCK_WORK_HOURS: Record<number, { start: number; end: number } | null> = {
    0: null,                    // Sunday  — off
    1: { start: 9, end: 18 },   // Monday
    2: { start: 6, end: 23 },   // Tuesday
    3: { start: 9, end: 18 },   // Wednesday
    4: { start: 9, end: 18 },   // Thursday
    5: { start: 9, end: 14 },   // Friday
    6: null,                    // Saturday — off
};

export function getAvailableSlotsForDate(date: Date): TimeSlot[] {
    const workHours = MOCK_WORK_HOURS[date.getDay()];
    if (!workHours) return [];

    const dateKey = toDateKey(date);
    const bookedMeetings = mockSchedule.filter(
        (s) => s.date === dateKey && s.status !== 'canceled',
    );

    return getGaps({ meetings: bookedMeetings, workTimeLimit: workHours }).map(
        (g) => ({ startHour: g.start, endHour: g.end }),
    );
}
