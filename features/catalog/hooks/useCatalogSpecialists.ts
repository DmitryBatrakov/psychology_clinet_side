import { useQuery } from "@tanstack/react-query";
import type {
    CatalogFilters,
    CatalogSort,
    CatalogSpecialistsResponse,
} from "@/features/catalog/model/types";

export interface UseCatalogSpecialistsParams {
    cursor?: string | null;
    limit: number;
    /** Фильтры каталога. */
    filters?: CatalogFilters;
    /** Сортировка каталога. */
    sort?: CatalogSort;
}

export const useCatalogSpecialists = ({
    cursor,
    limit,
    filters,
    sort = "default",
}: UseCatalogSpecialistsParams) => {
    return useQuery<CatalogSpecialistsResponse>({
        queryKey: ["catalog", cursor ?? null, limit, filters, sort],
        queryFn: async (): Promise<CatalogSpecialistsResponse> => {
            const params = new URLSearchParams();
            params.set("limit", String(limit));

            if (cursor) params.set("cursor", cursor);
            if (filters?.profession) params.set("profession", filters.profession);
            if (filters?.gender) params.set("gender", filters.gender);
            if (filters?.meetingFormat) {
                params.set("meetingFormat", filters.meetingFormat);
            }
            if (filters?.language) params.set("language", filters.language);
            if (filters?.sessionType) {
                params.set("sessionType", filters.sessionType);
            }
            if (filters?.priceMin != null) {
                params.set("priceMin", String(filters.priceMin));
            }
            if (filters?.priceMax != null) {
                params.set("priceMax", String(filters.priceMax));
            }
            if (filters?.services && filters.services.length > 0) {
                params.set("services", filters.services.join(","));
            }

            if (sort && sort !== "default") params.set("sort", sort);

            const res = await fetch(`/api/catalog/specialists?${params.toString()}`);
            const json = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(json?.error ?? "Failed to load catalog");
            }

            if (!json) {
                throw new Error("Invalid response format");
            }

            return json as CatalogSpecialistsResponse;
        },
        retry: 1,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
    });
};
