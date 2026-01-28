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
import { deleteAccount } from "./api";

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
    mutationFn: deleteAccount,
    onSuccess: () => {
      signOut(auth);
    },
  });
}

export function usePasswordReset() {
  return useMutation({
    mutationFn: async (email: string) => {
      await sendPasswordResetEmail(auth, email);
    },
    onSuccess: () => {
      console.log("Проверьте почту! Ссылка на смену пароля уже отправлена.");
    },
  });
}

// export function usePasswordReset() {
//   return useMutation({
//     mutationFn: async (email: string) => {
//       const res = await fetch("/api/auth/reset-password", {
//         method: "POST",
//         body: JSON.stringify({ email }),
//       });
//       return res.json();
//     },
//     onSuccess: () => console.log("Проверьте почту! Ссылка на смену пароля уже отправлена."),
//   });
// }