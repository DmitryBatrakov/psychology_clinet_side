import { useQuery } from "@tanstack/react-query";
import { fetchSpecialistById, SpecialistDetailsDTO } from "../api/fetchSpecialistById";

export const useSpecialistById = (id: string | undefined) => {
    return useQuery<SpecialistDetailsDTO | null>({
        queryKey: ["specialist", id],
        queryFn: async () => {
            if (!id) return null;
            return fetchSpecialistById(id);
        },
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
    }); 
};
