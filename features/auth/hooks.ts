"use client";

import { auth } from "@/lib/firebase";
import {
    signInWithCustomToken,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { fetchRegister } from "./api";

export const register = async (email: string, password: string) => {
    const { customToken } = await fetchRegister(email, password);
    await signInWithCustomToken(auth, customToken);
};

export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
    await signOut(auth);
};
