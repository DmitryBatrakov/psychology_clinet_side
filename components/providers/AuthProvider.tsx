"use client";

import { useEffect, useLayoutEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAtomValue, useSetAtom } from "jotai";
import { authAtom } from "@/src/store/auth/authAtom";
import { usePathname, useRouter } from "next/navigation";
import { useUserData } from "@/features/user/hooks";

const isAccount = (p: string) => p.startsWith("/account");
const isOnboarding = (p: string) => p.startsWith("/auth/onboarding");
const isLogin = (p: string) => p.startsWith("/auth/login");
const isRegister = (p: string) => p.startsWith("/auth/register");
const isAuthPages = (p: string) => isLogin(p) || isRegister(p);

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const setAuth = useSetAtom(authAtom);
    const { user, loading: authLoading } = useAtomValue(authAtom); 
    const router = useRouter();
    const pathname = usePathname();
    // const uid = user?.uid ?? null
    // const {
    //     data: dbUser,
    //     isLoading: dbUserLoading,
    //     isError: dbUserError,
    // } = useUserData(uid, authLoading);

    useLayoutEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setAuth({ user: currentUser, role: "user", loading: false });
                //cookies
            } else {
                setAuth({ user: null, role: null, loading: false });
                router.push("/auth/login");
                //delete cookies
            }
        });

        return () => unsubscribe();
    }, [setAuth, router]);

    useLayoutEffect(() => {

        console.log(user, authLoading, isAuthPages(pathname),pathname)
        if (authLoading) return;

        if (!user && !isAuthPages(pathname)) {
            router.replace("/auth/login");
        }
    }, [user, authLoading, pathname, router]);

    return <>{children}</>;
}
