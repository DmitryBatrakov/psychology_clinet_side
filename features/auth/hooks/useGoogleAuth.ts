import { auth } from "@/lib/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { fetchAuthUser } from "../../user/api/fetchAuthUser";

export const useGoogleAuth = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: async () => {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const idToken = await result.user.getIdToken();

            const res = await fetch("/api/auth/google-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(
                    json?.error ?? json?.message ?? "Google login failed",
                );
            }

            if (json.customToken) {
                await signInWithCustomToken(auth, json.customToken);
            }

            const userData = await fetchAuthUser();

            queryClient.refetchQueries({ queryKey: ["user", userData.uid] });

            if (!userData.profileComplete) {
                router.replace("/auth/onboarding");
            } else {
                router.replace("/dashboard");
            }
        },
    });
};
