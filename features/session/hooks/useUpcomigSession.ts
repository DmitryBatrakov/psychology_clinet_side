import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingSession } from "@/features/therapy/api/fetchUpcomigSession";
import { UpcomingSessionResponse } from "@/features/therapy/model/types";

export const useUpcomingSession = (
    uid: string | null,
    authLoading: boolean,
) => {
    return useQuery<UpcomingSessionResponse>({
        queryKey: ["upcoming-session", uid],
        queryFn: async () => fetchUpcomingSession(),
        enabled: !authLoading && !!uid,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
};
