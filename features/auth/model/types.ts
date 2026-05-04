import { User } from "firebase/auth";

export type AuthState = {
    user: User | null;
    role: "patient" | "specialist" | null;
    loading: boolean;
};

export interface RegisterCredentials {
    email: string;
    password: string;
    inviteToken?: string;
}

export interface GoogleAuthResponse {
    customToken: string;
}
