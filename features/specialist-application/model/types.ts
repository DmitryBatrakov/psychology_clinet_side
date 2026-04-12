export interface SpecialistApplicationCreateInput {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    passportId: string;
    languages: ("he" | "ru" | "en" | "ar")[];
    birthDate: string;
    gender: "male" | "female";
    profession: "psychologist" | "therapist" | "coach";
    sessionTypes: ("individual" | "couple" | "child" | "teen")[];
    experience: string;
    pricePerSession: string;
    hoursPerWeek: string;
    basicDegreeUrls: string[];
    advancedDegreeUrls?: string[];
    agree: boolean;
}

export interface SpecialistApplicationRecord extends Omit<SpecialistApplicationCreateInput, "agree"> {
    id: string;
    approved: boolean;
    approvedAt: Date | null;
    createdAt: Date;
}
