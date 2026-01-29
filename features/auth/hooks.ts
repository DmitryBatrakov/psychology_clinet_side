"use client";

import { auth } from "@/lib/firebase";
import {
    sendPasswordResetEmail,
    signInWithCustomToken,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { fetchRegister } from "./api";

import { useMutation } from "@tanstack/react-query";
import { fetchDeleteAccount } from "./api";

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

export function useDeleteAccount() {
    return useMutation({
        mutationFn: fetchDeleteAccount,
        onSuccess: () => {
            signOut(auth);
        },
    });
}

export function usePasswordReset() {
    return useMutation({
        mutationFn: async (email: string) => {
            const rawEmail = email.trim().toLowerCase();

            const isValidEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) &&
                rawEmail.length <= 254;

            if (!isValidEmail) {
                return;
            }

            try {
                await sendPasswordResetEmail(auth, rawEmail);
            } catch (error) {
                
            }
        }
    });
}
