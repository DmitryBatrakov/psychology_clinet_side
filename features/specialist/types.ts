import { UserData } from "../user/types";


type Profession = "psychologist" | "therapist" | "coach";
type MeetingFormat = "online" | "offline";

export interface SpecialistData extends UserData {
    id: string;
    profession: Profession;
    meetingFormat: MeetingFormat;
    experience: number;
    services: string[];
    //amountSessions: number 0
}
  
//return type для типиов услуг (ПТСП, тревога и тд)

