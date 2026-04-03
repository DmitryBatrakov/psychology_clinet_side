"use client";

import { useLayoutEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useSetAtom } from "jotai";
import { authAtom } from "@/src/store/auth/authAtom";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const setAuth = useSetAtom(authAtom);

    useLayoutEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setAuth({ user: currentUser, role: "user", loading: false });
            } else {
                setAuth({ user: null, role: null, loading: false });
            }
        });

        return () => unsubscribe();
    }, [setAuth]);

    return <>{children}</>;
}