"use client";

import { auth } from "@/lib/firebase";
import {
    sendPasswordResetEmail,
    signInWithCustomToken,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteAccount } from "./api";

import { registerUser } from "./api";
import { ApiError } from "@/lib/api-error";
import { RegisterCredentials } from "./types";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { notify } from "@/lib/notify";
import { getErrorMessage } from "@/lib/api-error";
import { useRouter } from "next/navigation";
import { fetchAuthUser } from "../user/api";


export const useRegister = () => {
    return useMutation<unknown, ApiError, RegisterCredentials>({
        mutationFn: ({ email, password }) => registerUser(email, password),
    });
};

export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
};

export const useGoogleAuth = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
  
    return useMutation<void, Error, void>({
      mutationFn: async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        
        const idToken = await result.user.getIdToken();
        
        const res = await fetch("/api/auth/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });
  
        const json = await res.json();
  
        if (!res.ok) {
          throw new Error(json?.error ?? json?.message ?? "Google login failed");
        }
  
        if (json.customToken) {
          await signInWithCustomToken(auth, json.customToken);
        }
  
        const userData = await fetchAuthUser();
        
        queryClient.invalidateQueries({ queryKey: ["user"] });
        
        if (!userData.profileComplete) {
          router.replace("/auth/onboarding");
        } else {
          router.replace("/dashboard");
        }
      },
      onSuccess: () => {
        notify.success("Login with Google successful!");
      },
      onError: (error) => {
        notify.error(getErrorMessage(error));
      },
    });
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
                console.error("Password reset error:", error);
                throw error;
            }
        }
    });
}