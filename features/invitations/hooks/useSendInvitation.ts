import { useMutation } from "@tanstack/react-query";
import { sendInvitation } from "../api/sendInvitation";

export function useSendInvitation() {
    return useMutation({
        // mutationFn: ({ email, message }: { email: string; message?: string }) => sendInvitation(email, message),
        mutationFn: async ({ email, message }: { email: string; message?: string }) => {
            console.log("sendInvitation:", email, message);
            // throw new Error("שגיאת בדיקה");
        },
    });
}
