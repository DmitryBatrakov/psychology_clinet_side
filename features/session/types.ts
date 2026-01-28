import { FieldValue } from "firebase/firestore";

type SessionStatus = "upcoming" | "completed" | "canceled";

export interface Session {
    id: string;
    userId: string;
    specialistId: string;
    startAt: Date;
    endAt?: Date;
    date: Date;
    status: SessionStatus;
    createdAt: FieldValue;
}
