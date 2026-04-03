import { useQuery } from "@tanstack/react-query";
import {
    fetchSpecialistSchedule,
    SpecialistScheduleResponse,
} from "@/features/slot/api/fetchSpecialistSchedule";

export function useSpecialistSchedule(specialistId: string) {
    return useQuery<SpecialistScheduleResponse>({
        queryKey: ["specialist-schedule", specialistId],
        queryFn: () => fetchSpecialistSchedule(specialistId),
        enabled: Boolean(specialistId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
    });
}
