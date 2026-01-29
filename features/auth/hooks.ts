"use client";

import { auth } from "@/lib/firebase";
import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { useMutation } from "@tanstack/react-query";
import { fetchDeleteAccount } from "./api";


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
                throw new Error("Неверный формат email");
            }

            try {
                await sendPasswordResetEmail(auth, rawEmail);
            } catch (error) {
                // Firebase will handle the error silently if email doesn't exist
                // This prevents email enumeration attacks
                console.error("Password reset error:", error);
                throw error;
            }
        }
    });
}






//----------------
import { registerUser } from "./api";
import { ApiError } from "@/lib/api-error";


interface RegisterCredentials {
    email: string;
    password: string;
}

export const useRegister = () => {
    return useMutation<unknown, ApiError, RegisterCredentials>({
        mutationFn: ({ email, password }) => registerUser(email, password),
    });
};