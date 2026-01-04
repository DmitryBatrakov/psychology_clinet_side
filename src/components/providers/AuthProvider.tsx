/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { onAuthStateChanged } from "firebase/auth";
import { authAtom } from "@/src/store/authAtom";
import { auth } from "@/src/lib/firebase";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const setAuth = useSetAtom(authAtom);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdTokenResult();
                const role = (token.claims.role as any) || "user";

                setAuth({ user, role, loading: false });
            } else {
                setAuth({ user: null, role: null, loading: false });
            }
        });

        return () => unsubscribe();
    }, [setAuth]);

    

    return <>{children}</>;
}
