import { SessionType } from "@/features/specialist/model/types";

export type VisitRecordStatus = 'pending' | 'upcoming' | 'completed' | 'canceled';

export type VisitRecord = {
    color: string;
    date: string;
    name: string;
    description: string;
    meet_url: string;
    uid: string;
    time: [number, number];
    status: VisitRecordStatus;
};

export type Schedule = VisitRecord[];

export interface CreateSessionInput {
    userId: string;
    startAt: string;
    endAt: string;
    date: string;
    type: SessionType;
}


export type WorkTimeLimit = {
    start: number;
    end: number;
}