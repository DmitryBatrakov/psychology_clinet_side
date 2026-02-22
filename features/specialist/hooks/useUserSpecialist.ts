import { useQuery } from "@tanstack/react-query";
import { specialistData } from "@/mockData/specialist/specialistData";
import { sessionData } from "@/mockData/sessions/sessionData";
import { SpecialistDTO } from "../model/types";

export const useUserSpecialists = (
    uid: string | null,
    authLoading: boolean
) => {
    return useQuery<SpecialistDTO[]>({
        queryKey: ["user-specialists", uid],
        queryFn: async () => {
            const userSessions = sessionData.filter((s) => s.userId === uid);
            const specialistIds = [
                ...new Set(userSessions.map((s) => s.specialistId)),
            ];

            return specialistData.filter((s) => specialistIds.includes(s.id));
        },
        enabled: !authLoading && !!uid,
    });
};
