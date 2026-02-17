import { auth } from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "firebase/auth";


export function usePasswordReset() {
    return useMutation({
        mutationFn: async (email: string) => {
            const rawEmail = email.trim().toLowerCase();

            const isValidEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) &&
                rawEmail.length <= 254;

            if (!isValidEmail) {
                throw new Error("Неверный формат email");
            }

            try {
                await sendPasswordResetEmail(auth, rawEmail);
            } catch (error) {
                console.error("Password reset error:", error);
                throw error;
            }
        },
    });
}
