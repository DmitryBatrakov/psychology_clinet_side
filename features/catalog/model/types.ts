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
