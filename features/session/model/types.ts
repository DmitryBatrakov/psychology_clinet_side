import { Timestamp } from "firebase-admin/firestore";

type SessionStatus = "upcoming" | "completed" | "canceled";

export type MeetingFormat = "online" | "offline";

export interface Session {
    id: string;
    userId: string;
    specialistId: string;
    startAt: Timestamp;
    endAt: Timestamp | undefined;
    date: Timestamp;
    status: SessionStatus;
    createdAt: string;
    income: number;
    desription: string | undefined;
    meetingUrl: string | undefined;
    meetingFormat: MeetingFormat;
}



export type SessionDTO = Omit<Session, 'startAt' | 'endAt' | 'date'> & {
    startAt: string,
    endAt: string | undefined,
    date: string,
}
