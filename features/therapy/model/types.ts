import { SpecialistDTO } from "@/features/specialist/model/types";
import { SessionDTO } from "@/features/session/model/types";
import { LucideIcon } from "lucide-react";


export interface TherapistFaqItem {
    id: number;
    questions: string;
    answers: string;
    icon: LucideIcon;
}

export interface UpcomingSessionResponse  {
    session: SessionDTO | null;
    specialist: SpecialistDTO | null;
}
