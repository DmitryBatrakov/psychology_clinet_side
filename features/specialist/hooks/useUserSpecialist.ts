import { useQuery } from "@tanstack/react-query";
import { SpecialistDTO } from "../model/types";
import { fetchUsersSpecialist } from "../api/fetchUsersSpecialist";

export const useUserSpecialists = (
    uid: string | null,
    authLoading: boolean,
    specialistIds: string[]
) => {
    const uniqueIds = [...new Set(specialistIds)].sort();

    return useQuery<SpecialistDTO[]>({
        queryKey: ["user-specialists", uid, uniqueIds],
        queryFn: () => fetchUsersSpecialist(uniqueIds),
        enabled: !authLoading && !!uid && uniqueIds.length > 0,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
};
