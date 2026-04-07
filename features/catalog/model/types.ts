import type {
    CatalogProfession,
    CatalogGender,
    CatalogLanguage,
    CatalogMeetingFormat,
    CatalogSessionType,
} from "./catalogEnums";

export interface CatalogFilters {
    profession?: CatalogProfession;
    priceMin?: number;
    priceMax?: number;
    gender?: CatalogGender;
    services?: string[];
    language?: CatalogLanguage;
    meetingFormat?: CatalogMeetingFormat;
    sessionType?: CatalogSessionType;
}

export type { CatalogSort } from "./catalogEnums";

export type CatalogMatchMode = "strict" | "fallback";

export interface CatalogSpecialistsResponse {
    items: import("@/features/specialist/model/types").SpecialistDTO[];
    nextCursor: string | null;
    prevCursor: string | null;
    hasMore: boolean;
    matchMode: CatalogMatchMode;
    total: number;
}
