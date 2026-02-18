import { useQuery } from "@tanstack/react-query";
import { specialistData } from "@/mockData/specialist/specialistData";
import type { SpecialistDTO } from "@/features/specialist/model/types";
import type { CatalogFilters, CatalogSort } from "@/features/catalog/model/types";

const PROFESSION_ORDER: Record<SpecialistDTO["profession"], number> = {
    psychologist: 0,
    therapist: 1,
    coach: 2,
};

export type ProfessionFilter = SpecialistDTO["profession"];

export interface UseCatalogSpecialistsParams {
    page: number;
    pageSize: number;
    /** Фильтры. Пока — заглушка по моку; позже перенос на API. */
    filters?: CatalogFilters;
    /** Сортировка. Пока — заглушка по моку; позже перенос на API. */
    sort?: CatalogSort;
}

export interface CatalogSpecialistsResult {
    items: SpecialistDTO[];
    total: number;
}

function applyStubFilters(
    list: SpecialistDTO[],
    filters: CatalogFilters | undefined,
    sort: CatalogSort | undefined
): SpecialistDTO[] {
    let result = list.slice();

    if (!filters) return applyStubSort(result, sort);

    if (filters.profession != null) {
        result = result.filter((s) => s.profession === filters.profession);
    }
    if (filters.priceMin != null) {
        result = result.filter((s) => s.pricePerSession >= filters.priceMin!);
    }
    if (filters.priceMax != null) {
        result = result.filter((s) => s.pricePerSession <= filters.priceMax!);
    }
    if (filters.gender != null) {
        result = result.filter((s) => s.gender === filters.gender);
    }
    if (filters.experienceMin != null) {
        result = result.filter((s) => s.experience >= filters.experienceMin!);
    }
    if (filters.services != null && filters.services.length > 0) {
        const selected = filters.services.map((v) => v.toLowerCase());
        result = result.filter((s) =>
            s.services.some((svc) => selected.includes(svc.toLowerCase()))
        );
    }
    if (filters.language != null) {
        result = result.filter((s) => s.languages.includes(filters.language!));
    }
    if (filters.meetingFormat != null) {
        result = result.filter(
            (s) => s.meetingFormat === filters.meetingFormat
        );
    }

    return applyStubSort(result, sort);
}

function applyStubSort(
    list: SpecialistDTO[],
    sort: CatalogSort | undefined
): SpecialistDTO[] {
    const sorted = list.slice();
    switch (sort) {
        case "experience_desc":
            sorted.sort((a, b) => b.experience - a.experience);
            break;
        case "experience_asc":
            sorted.sort((a, b) => a.experience - b.experience);
            break;
        case "price_asc":
            sorted.sort((a, b) => a.pricePerSession - b.pricePerSession);
            break;
        case "price_desc":
            sorted.sort((a, b) => b.pricePerSession - a.pricePerSession);
            break;
        case "default":
        default:
            sorted.sort((a, b) => {
                const byProfession =
                    PROFESSION_ORDER[a.profession] -
                    PROFESSION_ORDER[b.profession];
                if (byProfession !== 0) return byProfession;
                return b.experience - a.experience;
            });
            break;
    }
    return sorted;
}

export const useCatalogSpecialists = ({
    page,
    pageSize,
    filters,
    sort = "default",
}: UseCatalogSpecialistsParams) => {
    return useQuery<CatalogSpecialistsResult>({
        queryKey: ["catalog", page, pageSize, filters, sort],
        queryFn: async (): Promise<CatalogSpecialistsResult> => {
            // Заглушка: фильтрация и сортировка по моку. Позже заменить на fetchCatalogSpecialists({ page, pageSize, filters, sort }).
            const filtered = applyStubFilters(specialistData, filters, sort);
            const total = filtered.length;
            const start = (page - 1) * pageSize;
            const end = page * pageSize;
            const items = filtered.slice(start, end);
            return { items, total };
        },
    });
};
