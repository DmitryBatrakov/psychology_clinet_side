"use client";

import { useEffect } from "react";
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

    const uid = user?.uid ?? null

    const {
        data: dbUser,
        isLoading: dbUserLoading,
        isError: dbUserError,
    } = useUserData(uid, !uid && !authLoading);

    console.log(user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setAuth({ user: currentUser, role: "user", loading: false });
                //cookies
            } else {
                setAuth({ user: null, role: null, loading: false });
                //delete cookies
            }
        });

        return () => unsubscribe();
    }, [setAuth]);

  //   useEffect(() => {
  //   if (authLoading) return;

  //   // -------- State A: гость --------
  //   if (!user) {
  //     if (isAccount(pathname) || isOnboarding(pathname)) {
  //       router.replace("/auth/login");
  //     }
  //     return;
  //   }

  //   // дальше user есть -> ждём dbUser
  //   if (dbUserLoading) return;

  //   // важно: реши поведение при ошибке/нет профиля
  //   if (dbUserError || !dbUser) {
  //     // самый безопасный вариант для твоих сценариев:
  //     router.replace("/auth/onboarding");
  //     return;
  //   }

  //   // -------- State B: залогинен, но onboarding НЕ пройден --------
  //   if (!dbUser.profileComplete) {
  //     if (isAccount(pathname) || isAuthPages(pathname)) {
  //       router.replace("/auth/onboarding");
  //     }
  //     return;
  //   }

  //   // -------- State C: залогинен и onboarding пройден --------
  //   if (dbUser.profileComplete) {
  //     if (isAuthPages(pathname) || isOnboarding(pathname)) {
  //       router.replace("/account/profile");
  //     }
  //     return;
  //   }
  // }, [authLoading, user, dbUserLoading, dbUserError, dbUser, pathname, router]);

  return <>{children}</>;
}

