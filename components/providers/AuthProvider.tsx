"use client";

import { useLayoutEffect } from "react";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useSetAtom } from "jotai";
import { authAtom } from "@/src/store/auth/authAtom";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const setAuth = useSetAtom(authAtom);

    useLayoutEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                fetch("/api/auth/session-cookies/logout", { method: "POST" });
                setAuth({ user: null, role: null, loading: false });
            }
        });

        const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const tokenResult = await user.getIdTokenResult();
                const role = tokenResult.claims.role as "patient" | "specialist" | null ?? null;

                const idToken = tokenResult.token;
                await fetch("/api/auth/session-cookies/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken }),
                });

                setAuth({ user, role, loading: false });
            }
        });


        return () => {
            unsubscribeAuth();
            unsubscribeToken();
        };
    }, [setAuth]);

    return <>{children}</>;
}