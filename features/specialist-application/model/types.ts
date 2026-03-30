export interface SpecialistApplicationRecord
    extends Omit<
        SpecialistApplicationCreateInput,
        "basicDegree" | "advancedDegree"
    > {
    id: string;
    basicDegreeUrls: string[];
    advancedDegreeUrls?: string[] | null;
    approved: boolean;
    approvedAt: Date | null;
    createdAt: Date;
}


export interface SpecialistApplicationCreateInput {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    languages: ("he" | "ru" | "en" | "uk" | "ar")[];
    birthDate: string;
    gender: "male" | "female";
    profession: "psychologist" | "therapist" | "coach";
    meetingFormat: "online" | "offline";
    sessionTypes: ("individual" | "couple" | "child" | "teen")[];
    experience: string;
    pricePerSession: string;
    hoursPerWeek: string;
    // basicDegree: File[];
    // advancedDegree?: File[] | null;
    agree: boolean;
}