import { useQuery } from "@tanstack/react-query";
import { fetchScheduleDay } from "@/features/dashboard/api/fetchScheduleDay";
import type { ScheduleDayItem } from "@/features/dashboard/model/types";
import { scheduleDayMock } from "../mockData/scheduleDayMock";

export const useScheduleDay = (uid: string | null, authLoading: boolean) => {
    return useQuery<{ items: ScheduleDayItem[] }>({
        queryKey: ["schedule-day", uid],
        queryFn: () => Promise.resolve(scheduleDayMock),
        // queryFn: fetchScheduleDay,
        enabled: !authLoading && !!uid,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
};
