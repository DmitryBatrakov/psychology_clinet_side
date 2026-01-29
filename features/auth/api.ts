"use client";

import { auth } from "@/lib/firebase";

export async function fetchRegister(email: string, password: string) {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error ?? "Register failed");

    return json as { customToken: string };
}

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
