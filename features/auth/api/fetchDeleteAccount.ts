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