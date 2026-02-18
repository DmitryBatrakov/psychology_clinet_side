
type SessionStatus = "upcoming" | "completed" | "canceled";

export type MeetingFormat = "online" | "offline";

export interface Session {
    id: string;
    userId: string;
    specialistId: string;
    startAt: Date;
    endAt: Date | undefined;
    date: Date;
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
