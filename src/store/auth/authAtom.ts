import { atom } from "jotai";
import { AuthState } from "@/features/auth/types";

export const authAtom = atom<AuthState>({
    user: null,
    role: null,
    loading: true,
});
