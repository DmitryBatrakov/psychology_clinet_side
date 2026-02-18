import type { CatalogFilters, CatalogSort } from "@/features/catalog/model/types";
import {
    isAllowedProfession,
    isAllowedGender,
    isAllowedLanguage,
    isAllowedMeetingFormat,
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
    const meetingFormat = searchParams.get("meetingFormat");
    if (meetingFormat && isAllowedMeetingFormat(meetingFormat)) filters.meetingFormat = meetingFormat;
    const language = searchParams.get("language");
    if (language && isAllowedLanguage(language)) filters.language = language;
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
    const experienceMin = searchParams.get("experienceMin");
    const exp = Number(experienceMin);
    if (Number.isFinite(exp) && exp >= 0) filters.experienceMin = exp;
    return filters;
}

export function parseSortFromSearchParams(searchParams: URLSearchParams): CatalogSort {
    const s = searchParams.get("sort");
    return s && isAllowedSort(s) ? s : "default";
}
