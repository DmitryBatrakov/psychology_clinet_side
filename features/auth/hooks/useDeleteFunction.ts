import { useMutation } from "@tanstack/react-query";
import { fetchDeleteAccount } from "../api/fetchDeleteAccount";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useDeleteAccount() {
    return useMutation({
        mutationFn: fetchDeleteAccount,
        onSuccess: () => {
            signOut(auth);
        },
    });
}