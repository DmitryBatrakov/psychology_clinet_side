import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
};