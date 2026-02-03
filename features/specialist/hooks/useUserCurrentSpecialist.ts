// 1. useUserCurrentSpecialist.ts - ТЕКУЩИЙ/ПОСЛЕДНИЙ специалист
import { useQuery } from "@tanstack/react-query";
import { specialistData } from "@/mockData/specialistData";
import { sessionData } from "@/mockData/sessionData";
import { SpecialistDTO } from "../model/types";

export const useUserCurrentSpecialist = (
    uid: string | null,
    authLoading: boolean
) => {
    return useQuery<SpecialistDTO | null>({
        queryKey: ["current-specialist", uid],
        queryFn: async () => {
            const userSessions = sessionData
                .filter((s) => s.userId === "user-1") // TODO: change to uid
                .sort(
                    (a, b) =>
                        new Date(b.startAt).getTime() -
                        new Date(a.startAt).getTime()
                );

            const lastSession = userSessions[0];
            if (!lastSession) return null;

            return specialistData.find(
                (s) => s.id === lastSession.specialistId
            ) ?? null;
        },
        enabled: !authLoading && !!uid,
    });
};
