"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";

function RefreshSession() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/account/therapy";

    useEffect(() => {
        const user = auth.currentUser;

        if (!user) {
            router.replace("/auth/login");
            return;
        }

        user.getIdToken(true)
            .then(async (idToken) => {
                const res = await fetch("/api/auth/session-cookies/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken }),
                });

                if (res.ok) {
                    router.replace(redirect);
                } else {
                    router.replace("/auth/login");
                }
            })
            .catch(() => router.replace("/auth/login"));
    }, [redirect, router]);

    return null;
}

export default function RefreshSessionPage() {
    return (
        <Suspense>
            <RefreshSession />
        </Suspense>
    );
}
