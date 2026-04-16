import type { SessionDTO } from "@/features/session/model/types";
import type { Gender, Languages } from "@/features/user/model/types";

export interface PatientViewPatient {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    photoUrl: string | null;
    birthDate: string;
    gender: Gender;
    languages: Languages[];
}

export interface PatientViewResponse {
    patient: PatientViewPatient;
    sessions: SessionDTO[];
}
