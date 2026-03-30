import { UserData } from "@/features/user/model/types";

export type SessionType = "individual" | "couple" | "child" | "teen";

export type Profession = "psychologist" | "therapist" | "coach";
export type MeetingFormat = "online" | "offline";

export interface SpecialistData extends UserData {
    id: string;
    profession: Profession;
    meetingFormat: MeetingFormat;
    sessionTypes: SessionType[];
    experience: number;
    pricePerSession: number;
    services: string[];
}

export type SpecialistDTO = Omit<SpecialistData, "birthDate"> & {
    birthDate: string;
};
//return type для типиов услуг (ПТСП, тревога и тд)

