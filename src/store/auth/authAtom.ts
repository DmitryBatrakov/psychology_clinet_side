import { atom } from "jotai";
import { AuthState } from "@/src/model/auth/auth";

export const authAtom = atom<AuthState>({
    user: null,
    role: null,
    loading: true,
});
