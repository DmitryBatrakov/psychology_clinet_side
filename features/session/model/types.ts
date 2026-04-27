import { SessionType } from "@/features/specialist/model/types";
import { Timestamp } from "firebase-admin/firestore";

type SessionStatus = "upcoming" | "completed" | "canceled" | "pending";


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
    meetingUrl: string | undefined;
    type: SessionType;
    notes: string | undefined;
}



export type SessionDTO = Omit<Session, 'startAt' | 'endAt' | 'date'> & {
    startAt: string,
    endAt: string | undefined,
    date: string,
    notes: string | undefined,
}
