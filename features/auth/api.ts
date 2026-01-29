"use client";

import { auth } from "@/lib/firebase";

export async function fetchDeleteAccount() {
  const user = auth.currentUser;
  if (!user) throw new Error("Не авторизован");

  const idToken = await user.getIdToken();

  const res = await fetch("/api/auth/delete", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Ошибка удаления");
  }

  return res.json();
}

//-----------------
import { signInWithCustomToken } from "firebase/auth";

export async function registerUser(email: string, password: string) {
    // 1. Отправляем запрос на сервер
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const json = await res.json().catch(() => ({}));
    
    // 2. Проверяем ошибки
    if (!res.ok) {
        throw new Error(json?.error ?? "Register failed");
    }

    // 3. Получаем customToken
    const { customToken } = json as { customToken: string };
    
    // 4. Логиним пользователя с customToken
    await signInWithCustomToken(auth, customToken);
    
    return json;
}