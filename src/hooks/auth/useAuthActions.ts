import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { onboardingSchema } from "@/src/app/validation/validation.user";
import { auth, db } from "@/lib/firebase";
import { UserData } from "@/src/model/user/user";
import { useMutation } from "@tanstack/react-query";

export const useAuthActions = () => {

    const logout = async () => {
        try {
            await signOut(auth);
            window.location.href = "/login";
        } catch (error) {
            console.error("ошибка при выходе:", error);
        }
    };

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const register = async (email: string, password: string) => {
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            return user;
        } catch (error) {
            console.error(error);
            throw new Error("REGISTER FAILED");
        }
    };

    const completeRegisterOnboarding = async (
        uid: string,
        data: UserData
    ): Promise<void> => {
        try {
            const validatedData = onboardingSchema.parse(data);

            await setDoc(doc(db, "users", uid), {
                ...validatedData,
                balance: 0,
                photoURL: null,
                createdAt: serverTimestamp(),
            });



            console.log(validatedData);
            

        } catch (error) {
            console.error(error);
            throw new Error("ONBOARDING SAVE FAILED");
        }
    };

    return { logout, login, register, completeRegisterOnboarding };
};
