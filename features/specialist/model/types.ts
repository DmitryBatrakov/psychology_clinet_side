import { UserData } from "@/features/user/model/types";

export type SessionType = "individual" | "couple" | "child" | "teen";

export type Profession = "psychologist" | "therapist" | "coach";

export type WorkMethod =
    | "CBT"
    | "Schema Therapy"
    | "Psychoanalysis"
    | "Gestalt Therapy"
    | "Systemic Family Therapy"
    | "Positive Therapy"
    | "Coaching"
    | "Transactional Analysis"
    | "Brief Strategic Therapy"
    | "Client-Centered Therapy"
    | "Body-Oriented Therapy"
    | "Psychodynamic Therapy"
    | "Neuropsychological Therapy";

export type Degree = {
    degreeName: string;
    description: string;
};

export interface SpecialistData extends UserData {
    id: string;
    profession: Profession;
    sessionTypes: SessionType[];
    experience: number;
    pricePerSession: number;
    services: string[];
    about: string;
    workMethods: string[];
    mainDegree: Degree;
    additionalDegrees: Degree[];
    values: string;
}

export type SpecialistDTO = Omit<SpecialistData, "birthDate"> & {
    birthDate: string;
};
