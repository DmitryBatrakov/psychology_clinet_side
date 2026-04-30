import { SessionType } from "@/features/specialist/model/types";
import { UserProfile } from "@/features/user/model/types";
import { Timestamp } from "firebase/firestore";

export type VisitRecordStatus = 'pending' | 'upcoming' | 'completed' | 'canceled';

export type PatientInfo = Pick<UserProfile, 'firstName' | 'lastName' | 'photoUrl' | 'gender' | 'languages' | 'birthDate'>;

export type VisitRecord = {
    date: string;
    description: string;
    meet_url: string;
    uid: string;
    time: [number, number];
    status: VisitRecordStatus;
    type: SessionType;
    notes?: NotesRecord[];
    patient: PatientInfo;
};

export type NotesRecord = {
    date: Timestamp;
    note: string
}

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