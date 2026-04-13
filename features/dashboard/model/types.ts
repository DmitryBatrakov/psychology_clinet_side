import type { SessionDTO } from "@/features/session/model/types";

export interface ScheduleDayPatient {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl?: string | null;
}

export interface ScheduleDayItem {
    session: SessionDTO;
    patient: ScheduleDayPatient;
}

export interface ScheduleDayResponse {
    items: ScheduleDayItem[];
}
