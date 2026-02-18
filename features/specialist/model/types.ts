import { UserData } from "@/features/user/model/types";


type Profession = "psychologist" | "therapist" | "coach";
type MeetingFormat = "online" | "offline";

export interface SpecialistData extends UserData {
    id: string;
    profession: Profession;
    meetingFormat: MeetingFormat;
    experience: number;
    pricePerSession: number;
    services: string[];
    //amountSessions: number 0
}
  
export type SpecialistDTO = Omit<SpecialistData, 'birthDate'> & {
    birthDate: string;
};
//return type для типиов услуг (ПТСП, тревога и тд)

