import { useUpcomingSession } from "@/features/session/hooks/useUpcomigSession";
import { useUserSession } from "@/features/session/hooks/useUserSession";
import { useUserCurrentSpecialist } from "@/features/specialist/hooks/useUserCurrentSpecialist";
import { useUserData } from "@/features/user/hooks/useUserData";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";

export const useTherapyData = () => {
    const { user: authUser, loading: authLoading } = useAtomValue(authAtom);
    const uid = authUser?.uid ?? null;

    const args = [uid, authLoading] as const; 

    const dbUser = useUserData(...args);
    const session = useUserSession(...args);
    const specialist = useUserCurrentSpecialist(...args);
    const upcomingSession = useUpcomingSession(...args);

    return { uid, authLoading, dbUser, session, specialist };
};

export type TherapyData = ReturnType<typeof useTherapyData>;
