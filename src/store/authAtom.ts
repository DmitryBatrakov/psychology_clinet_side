import { atom } from "jotai";
import { User } from "firebase/auth";

type AuthState = {
    user: User | null;
    role: "user" | "psychologist" | "admin" | null;
    loading: boolean;
};

export const authAtom = atom<AuthState>({
    user: null,
    role: null,
    loading: true,
});
