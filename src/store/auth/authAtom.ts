import { atom } from "jotai";
import { AuthState } from "@/features/auth/model/types";

export const authAtom = atom<AuthState>({
    user: null,
    role: null,
    loading: true,
});
