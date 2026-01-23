"use client";

import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { onAuthStateChanged } from "firebase/auth";
import { authAtom } from "@/src/store/auth/authAtom";
import { auth } from "@/lib/firebase";
import { useUserData } from "@/src/hooks/user/useUserData";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const setAuth = useSetAtom(authAtom);

    const { user, loading: authLoading } = useAtomValue(authAtom);

    const { data: dbUser, isLoading: dbLoading } = useUserData(user?.uid);

    const router = useRouter();
    const pathname = usePathname();

    const ACCOUNT = "/account";

    console.log(authAtom);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            const expires = new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toUTCString();

            if (currentUser) {
                document.cookie = `session=true; expires=${expires}; path=/; SameSite=Lax`;

                setAuth({ user: currentUser, role: "user", loading: false });
            } else {
                document.cookie =
                    "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                setAuth({ user: null, role: null, loading: false });
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (authLoading) return;
        if (!user) return; 
        if (dbLoading) return;

        if (!dbUser && pathname.startsWith(ACCOUNT)) {
            router.replace("/onboarding");
        }
    }, [authLoading, user, dbLoading, dbUser, pathname, router]);

    return <>{children}</>;
}
