import { useQuery } from "@tanstack/react-query"
import { fetchWorkTimeLimit } from "../api/fetchWorkTimeLimit";
import { WorkTimeLimit } from "../model/types";


export const useWorkTimeLimit = (uid: string | null, authLoading: boolean) => {
    return useQuery<{ data: WorkTimeLimit } | null>({
        queryKey: ["work-time-limit", uid],
        // queryFn: fetchWorkTimeLimit,
        queryFn: () => Promise.resolve({ data: { start: 6, end: 18 } }),
        enabled: !authLoading && !!uid,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
}