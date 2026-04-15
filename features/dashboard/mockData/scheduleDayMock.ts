import type { ScheduleDayResponse } from "@/features/dashboard/model/types";

const today = new Date();

function todayAt(hours: number, minutes = 0): string {
    const d = new Date(today);
    d.setHours(hours, minutes, 0, 0);
    return d.toISOString();
}
 
export const scheduleDayMock: ScheduleDayResponse = {
    items: [
        {
            session: {
                id: "session-1",
                userId: "patient-1",
                specialistId: "specialist-1",
                startAt: todayAt(9, 0),
                endAt: todayAt(9, 50),
                date: todayAt(9, 0),
                status: "completed",
                createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString(),
                income: 350,
                desription: "פגישת מעקב שבועית",
                meetingUrl: undefined,
            },
            patient: {
                id: "patient-1",
                firstName: "יוסי",
                lastName: "כהן",
                photoUrl: null,
            },
        },
        {
            session: {
                id: "session-2",
                userId: "patient-2",
                specialistId: "specialist-1",
                startAt: todayAt(10, 0),
                endAt: todayAt(10, 50),
                date: todayAt(10, 0),
                status: "completed",
                createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toISOString(),
                income: 400,
                desription: undefined,
                meetingUrl: "https://meet.example.com/abc123",
            },
            patient: {
                id: "patient-2",
                firstName: "מיכל",
                lastName: "לוי",
                photoUrl: null,
            },
        },
        {
            session: {
                id: "session-3",
                userId: "patient-3",
                specialistId: "specialist-1",
                startAt: todayAt(11, 30),
                endAt: todayAt(12, 20),
                date: todayAt(11, 30),
                status: "canceled",
                createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
                income: 0,
                desription: "ביטול מצד המטופל",
                meetingUrl: undefined,
            },
            patient: {
                id: "patient-3",
                firstName: "דנה",
                lastName: "אברהם",
                photoUrl: null,
            },
        },
        {
            session: {
                id: "session-4",
                userId: "patient-4",
                specialistId: "specialist-1",
                startAt: todayAt(14, 0),
                endAt: todayAt(14, 50),
                date: todayAt(14, 0),
                status: "upcoming",
                createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString(),
                income: 350,
                desription: undefined,
                meetingUrl: "https://meet.example.com/xyz789",
            },
            patient: {
                id: "patient-4",
                firstName: "אבי",
                lastName: "שמעון",
                photoUrl: null,
            },
        },
        {
            session: {
                id: "session-5",
                userId: "patient-5",
                specialistId: "specialist-1",
                startAt: todayAt(15, 30),
                endAt: todayAt(16, 20),
                date: todayAt(15, 30),
                status: "upcoming",
                createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString(),
                income: 450,
                desription: "פגישה ראשונה",
                meetingUrl: undefined,
            },
            patient: {
                id: "patient-5",
                firstName: "רחל",
                lastName: "גולן",
                photoUrl: null,
            },
        },
        {
            session: {
                id: "session-6",
                userId: "patient-6",
                specialistId: "specialist-1",
                startAt: todayAt(17, 0),
                endAt: todayAt(17, 50),
                date: todayAt(17, 0),
                status: "upcoming",
                createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10).toISOString(),
                income: 350,
                desription: undefined,
                meetingUrl: "https://meet.example.com/def456",
            },
            patient: {
                id: "patient-6",
                firstName: "נועם",
                lastName: "ברק",
                photoUrl: null,
            },
        },
        {
            session: {
                id: "session-7",
                userId: "patient-7",
                specialistId: "specialist-1",
                startAt: todayAt(18, 0),
                endAt: todayAt(18, 50),
                date: todayAt(17, 0),
                status: "upcoming",
                createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10).toISOString(),
                income: 350,
                desription: undefined,
                meetingUrl: "https://meet.example.com/def456",
            },
            patient: {
                id: "patient-7",
                firstName: "נועם",
                lastName: "גולן",
                photoUrl: null,
            },
        },
    ],
};
