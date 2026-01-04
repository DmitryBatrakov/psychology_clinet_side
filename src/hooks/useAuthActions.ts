import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../lib/firebase"

export const useAuthActions = () => {
    const logout = async () => {
        try {
            await signOut(auth)
            document.cookie = "session=; path=/; ";
            window.location.href = "/login";
        } catch (error) {
            console.error("ошибка при выходе:", error)
        }

    }
    
    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const register = async (email: string, password: string) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    return { logout, login, register };
}