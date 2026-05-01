import { useQuery } from '@tanstack/react-query';
import { toDateKey } from '@/lib/func/to-date-key/toDateKey';
import { getAvailableSlotsForDate, TimeSlot } from '../lib/getAvailableSlots';

// SWAP POINT: replace with fetchAvailableSlotsFromApi(date) when backend is ready
async function fetchSlots(date: Date): Promise<TimeSlot[]> {
    return getAvailableSlotsForDate(date);
}

export function useAvailableSlots(date: Date | null) {
    return useQuery({
        queryKey: ['available-slots', date ? toDateKey(date) : null],
        queryFn: () => fetchSlots(date!),
        enabled: !!date,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
}
