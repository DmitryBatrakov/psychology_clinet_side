import { Timestamp } from "firebase/firestore";

type Languages = "he" | "ru" | "en" | "uk" | "ar";
type Gender = "male" | "female";

export interface UserData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: Date | Timestamp;
    photo?: string | null;
    balance?: number;
    gender: Gender;
    languages: Languages[];
}


