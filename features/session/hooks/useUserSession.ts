import { useQuery } from "@tanstack/react-query";
import { SessionDTO } from "../model/types";
import { fetchAllSession } from "../api/fetchAllSession";

export const useUserSession = (uid: string | null, authLoading: boolean) => {
    return useQuery<{ past: SessionDTO[]; upcoming: SessionDTO[] }>({
        queryKey: ["sessions", uid],
        queryFn: fetchAllSession,
        enabled: !authLoading && !!uid,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
};
