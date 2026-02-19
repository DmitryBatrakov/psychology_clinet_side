import type { SpecialistDTO } from "@/features/specialist/model/types";
import type { CatalogProfession, CatalogGender, CatalogLanguage, CatalogMeetingFormat, CatalogSessionType, CatalogSort } from "./catalogEnums";

/** Фильтры каталога. Вся фильтрация на бэкенде; здесь — типы и заглушки в queryFn. */
export interface CatalogFilters {
    /** Профессия */
    profession?: CatalogProfession;
    /** Минимальная цена за сессию */
    priceMin?: number;
    /** Максимальная цена за сессию */
    priceMax?: number;
    /** Пол специалиста */
    gender?: CatalogGender;
    /** Темы/услуги (несколько slug'ов) — специалист подходит, если есть хотя бы одна */
    services?: string[];
    /** Язык */
    language?: CatalogLanguage;
    /** Формат встречи */
    meetingFormat?: CatalogMeetingFormat;
    /** Тип сессии: индивидуальная, парная, детская до 12, подросток 12–18 */
    sessionType?: CatalogSessionType;
}

/** Варианты сортировки для каталога (реэкспорт из catalogEnums). */
export type { CatalogSort } from "./catalogEnums";
