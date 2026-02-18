import { useQuery } from "@tanstack/react-query";
import { specialistData } from "@/mockData/specialist/specialistData";
import type { SpecialistDTO } from "@/features/specialist/model/types";

export const useSpecialistById = (id: string | undefined) => {
    return useQuery<SpecialistDTO | null>({
        queryKey: ["specialist", id],
        queryFn: async () => {
            if (!id) return null;
            return specialistData.find((s) => s.id === id) ?? null;
        },
        enabled: Boolean(id),
    });
};
