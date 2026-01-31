"use client";

import { auth } from "@/lib/firebase";

export async function fetchAuthUser() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const idToken = await user.getIdToken();

  const res = await fetch("/api/auth/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? "Failed to load profile");
  }

  return res.json();
}


export async function fetchUserData() {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    const idToken = await user.getIdToken();

    const res = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(json?.error ?? "Failed to load user profile");
    }

    return json;
}

// export async function updateUserProfile(data: Partial<{
//     firstName: string;
//        lastName: string;
//        phoneNumber: string;
//        birthDate: string;
//       //  gender: Gender;
//       //  languages: Languages[];
// }>) {
//     const user = auth.currentUser;
//     if (!user) throw new Error("Not authenticated");

//     const idToken = await user.getIdToken();

//     const res = await fetch("/api/user/profile", {
//         method: "PUT",
//         headers: {
//             Authorization: `Bearer ${idToken}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });

//     const json = await res.json().catch(() => ({}));

//     if (!res.ok) {
//         throw new Error(json?.error ?? "Failed to update profile");
//     }

//     return json;
// }