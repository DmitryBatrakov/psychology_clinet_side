import { User } from "firebase/auth";

export type AuthState = {
    user: User | null;
    role: "user" | "psychologist" | null;
    loading: boolean;
};