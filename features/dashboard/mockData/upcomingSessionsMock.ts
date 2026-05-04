import type { ScheduleDayItem } from '@/features/dashboard/model/types';
import type { SessionType } from '@/features/specialist/model/types';

function daysFromNow(days: number, hours: number, minutes = 0): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hours, minutes, 0, 0);
    return d.toISOString();
}

const PATIENTS = [
    { id: 'p1', firstName: 'יוסי',  lastName: 'כהן',     photoUrl: 'https://picsum.photos/seed/p1/200' },
    { id: 'p2', firstName: 'מיכל',  lastName: 'לוי',     photoUrl: null },
    { id: 'p3', firstName: 'דנה',   lastName: 'אברהם',   photoUrl: 'https://picsum.photos/seed/p3/200' },
    { id: 'p4', firstName: 'אבי',   lastName: 'שמעון',   photoUrl: null },
    { id: 'p5', firstName: 'רחל',   lastName: 'גולן',    photoUrl: 'https://picsum.photos/seed/p5/200' },
    { id: 'p6', firstName: 'נועם',  lastName: 'ברק',     photoUrl: null },
    { id: 'p7', firstName: 'שיר',   lastName: 'פרץ',     photoUrl: 'https://picsum.photos/seed/p7/200' },
    { id: 'p8', firstName: 'נדב',   lastName: 'ישראלי',  photoUrl: null },
] as const;

function mk(
    id: string,
    day: number,
    h: number,
    m: number,
    pIdx: number,
    type: SessionType,
    status: 'upcoming' | 'pending' = 'upcoming',
): ScheduleDayItem {
    const p = PATIENTS[pIdx % PATIENTS.length];
    const endTotal = h * 60 + m + 50;
    return {
        session: {
            id,
            userId: p.id,
            specialistId: 'specialist-1',
            startAt: daysFromNow(day, h, m),
            endAt:   daysFromNow(day, Math.floor(endTotal / 60), endTotal % 60),
            date:    daysFromNow(day, h, m),
            status,
            createdAt: daysFromNow(-3, 10),
            income: 350,
            meetingUrl: pIdx % 2 === 0 ? 'https://meet.example.com/x' : undefined,
            type,
            notes: undefined,
        },
        patient: { id: p.id, firstName: p.firstName, lastName: p.lastName, photoUrl: p.photoUrl },
    };
}

// slots per day: 9:00 · 10:30 · 12:00 · 13:30 · 15:00 · 17:00
export const upcomingSessionsMock: { items: ScheduleDayItem[] } = {
    items: [
        // ── day 0 ──────────────────────────────────────────────────────────
        mk('d0-1', 0,  9,  0, 0, 'individual'),
        mk('d0-2', 0, 10, 30, 1, 'couple'),
        mk('d0-3', 0, 12,  0, 2, 'individual'),
        mk('d0-4', 0, 13, 30, 3, 'teen',       'pending'),
        mk('d0-5', 0, 15,  0, 4, 'individual'),
        mk('d0-6', 0, 17,  0, 5, 'child'),

        // ── day 1 ──────────────────────────────────────────────────────────
        mk('d1-1', 1,  9,  0, 6, 'individual'),
        mk('d1-2', 1, 10, 30, 7, 'couple'),
        mk('d1-3', 1, 12,  0, 0, 'individual'),
        mk('d1-4', 1, 13, 30, 1, 'child',      'pending'),
        mk('d1-5', 1, 15,  0, 2, 'individual'),
        mk('d1-6', 1, 17,  0, 3, 'teen'),

        // ── day 3 ──────────────────────────────────────────────────────────
        mk('d3-1', 3,  9,  0, 4, 'individual'),
        mk('d3-2', 3, 10, 30, 5, 'couple'),
        mk('d3-3', 3, 12,  0, 6, 'individual'),
        mk('d3-4', 3, 13, 30, 7, 'teen'),
        mk('d3-5', 3, 15,  0, 0, 'individual', 'pending'),
        mk('d3-6', 3, 17,  0, 1, 'child'),

        // ── day 5 ──────────────────────────────────────────────────────────
        mk('d5-1', 5,  9,  0, 2, 'individual'),
        mk('d5-2', 5, 10, 30, 3, 'couple',     'pending'),
        mk('d5-3', 5, 12,  0, 4, 'individual'),
        mk('d5-4', 5, 13, 30, 5, 'child'),
        mk('d5-5', 5, 15,  0, 6, 'individual'),
        mk('d5-6', 5, 17,  0, 7, 'teen'),

        // ── day 7 ──────────────────────────────────────────────────────────
        mk('d7-1', 7,  9,  0, 0, 'couple'),
        mk('d7-2', 7, 10, 30, 1, 'individual'),
        mk('d7-3', 7, 12,  0, 2, 'teen',       'pending'),
        mk('d7-4', 7, 13, 30, 3, 'individual'),
        mk('d7-5', 7, 15,  0, 4, 'child'),
        mk('d7-6', 7, 17,  0, 5, 'individual'),

        // ── day 10 ─────────────────────────────────────────────────────────
        mk('d10-1', 10,  9,  0, 6, 'individual'),
        mk('d10-2', 10, 10, 30, 7, 'couple'),
        mk('d10-3', 10, 12,  0, 0, 'individual'),
        mk('d10-4', 10, 13, 30, 1, 'teen'),
        mk('d10-5', 10, 15,  0, 2, 'individual', 'pending'),
        mk('d10-6', 10, 17,  0, 3, 'child'),

        // ── day 14 ─────────────────────────────────────────────────────────
        mk('d14-1', 14,  9,  0, 4, 'individual'),
        mk('d14-2', 14, 10, 30, 5, 'couple',     'pending'),
        mk('d14-3', 14, 12,  0, 6, 'individual'),
        mk('d14-4', 14, 13, 30, 7, 'teen'),
        mk('d14-5', 14, 15,  0, 0, 'individual'),
        mk('d14-6', 14, 17,  0, 1, 'child'),
    ],
};
