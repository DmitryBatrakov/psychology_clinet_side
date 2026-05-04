import { useQuery } from '@tanstack/react-query';
import type { ScheduleDayItem } from '@/features/dashboard/model/types';
import { fetchSpecialistUpcomingSessions } from '../api/fetchSpecialistUpcomingSessions';

export function useSpecialistUpcomingSessions() {
    return useQuery<{ items: ScheduleDayItem[] }>({
        queryKey: ['specialist-upcoming-sessions'],
        queryFn: fetchSpecialistUpcomingSessions,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
}
