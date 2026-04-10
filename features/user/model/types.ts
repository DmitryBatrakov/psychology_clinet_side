export type Languages = "he" | "ru" | "en" | "ar";
export type Gender = "male" | "female";

export interface UserData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    photoUrl?: string | null;
    birthDate: Date;
    gender: Gender;
    languages: Languages[];
}

export interface UserRegisterData {
    email: string;
    password: string;
}

export type UserProfile = {
    uid: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: string;
    gender: Gender;
    languages: Languages[];
    photoUrl: string | null;
    balance: number;
    profileComplete: boolean;
};
