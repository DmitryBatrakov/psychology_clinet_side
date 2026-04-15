import type { CatalogFilters, CatalogSort } from "@/features/catalog/model/types";
import {
    isAllowedProfession,
    isAllowedGender,
    isAllowedLanguage,
    isAllowedSessionType,
    isAllowedSort,
} from "@/features/catalog/model/catalogEnums";
import { getAllServiceValues } from "@/features/catalog/model/serviceTopics";
import { FILTER_ANY, PRICE_RANGE_OPTIONS } from "@/features/catalog/model/catalogFilterOptions";

export function parseFiltersFromSearchParams(searchParams: URLSearchParams): CatalogFilters {
    const profession = searchParams.get("profession");
    const filters: CatalogFilters = {};
    filters.profession = profession && isAllowedProfession(profession) ? profession : "psychologist";
    const gender = searchParams.get("gender");
    if (gender && isAllowedGender(gender)) filters.gender = gender;
    const language = searchParams.get("language");
    if (language && isAllowedLanguage(language)) filters.language = language;
    const sessionType = searchParams.get("sessionType");
    if (sessionType && isAllowedSessionType(sessionType)) filters.sessionType = sessionType;
    const serviceParams = searchParams.getAll("service");
    if (serviceParams.length > 0) {
        const allowed = getAllServiceValues(filters.profession ?? "psychologist");
        const valid = serviceParams.filter((s) => s !== FILTER_ANY && allowed.has(s));
        if (valid.length > 0) filters.services = valid;
    }
    const priceRange = searchParams.get("priceRange");
    const pr = PRICE_RANGE_OPTIONS.find((o) => o.value === priceRange);
    if (pr?.priceMin != null) filters.priceMin = pr.priceMin;
    if (pr?.priceMax != null) filters.priceMax = pr.priceMax;
    return filters;
}

export function parseSortFromSearchParams(searchParams: URLSearchParams): CatalogSort {
    const s = searchParams.get("sort");
    return s && isAllowedSort(s) ? s : "default";
}
