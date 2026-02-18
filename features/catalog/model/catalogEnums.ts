/**
 * Enum'ы и константы допустимых значений для каталога.
 * Один источник истины для фронта и (позже) валидации на API.
 */

import { getAllAllowedServiceSlugs } from "./serviceTopics";

// --- Профессия ---
export const ALLOWED_PROFESSIONS = ["psychologist", "therapist", "coach"] as const;
export type CatalogProfession = (typeof ALLOWED_PROFESSIONS)[number];

// --- Пол ---
export const ALLOWED_GENDERS = ["female", "male"] as const;
export type CatalogGender = (typeof ALLOWED_GENDERS)[number];

// --- Язык ---
export const ALLOWED_LANGUAGES = ["he", "ru", "en", "uk", "ar"] as const;
export type CatalogLanguage = (typeof ALLOWED_LANGUAGES)[number];

// --- Формат встречи ---
export const ALLOWED_MEETING_FORMATS = ["online", "offline"] as const;
export type CatalogMeetingFormat = (typeof ALLOWED_MEETING_FORMATS)[number];

// --- Сортировка ---
export const ALLOWED_SORT_VALUES = [
    "default",
    "experience_desc",
    "experience_asc",
    "price_asc",
    "price_desc",
] as const;
export type CatalogSort = (typeof ALLOWED_SORT_VALUES)[number];

// --- Пагинация ---
export const ALLOWED_PAGE_SIZES = [6, 12, 24] as const;
export type CatalogPageSize = (typeof ALLOWED_PAGE_SIZES)[number];

// --- Темы (услуги): допустимые slug'и берём из serviceTopics ---
let _allowedServiceSlugs: Set<string> | null = null;
export function getAllowedServiceSlugs(): Set<string> {
    if (!_allowedServiceSlugs) _allowedServiceSlugs = getAllAllowedServiceSlugs();
    return _allowedServiceSlugs;
}

/** Проверка, что значение — допустимая профессия. */
export function isAllowedProfession(value: string): value is CatalogProfession {
    return (ALLOWED_PROFESSIONS as readonly string[]).includes(value);
}

/** Проверка, что значение — допустимый пол. */
export function isAllowedGender(value: string): value is CatalogGender {
    return (ALLOWED_GENDERS as readonly string[]).includes(value);
}

/** Проверка, что значение — допустимый язык. */
export function isAllowedLanguage(value: string): value is CatalogLanguage {
    return (ALLOWED_LANGUAGES as readonly string[]).includes(value);
}

/** Проверка, что значение — допустимый формат встречи. */
export function isAllowedMeetingFormat(value: string): value is CatalogMeetingFormat {
    return (ALLOWED_MEETING_FORMATS as readonly string[]).includes(value);
}

/** Проверка, что значение — допустимая сортировка. */
export function isAllowedSort(value: string): value is CatalogSort {
    return (ALLOWED_SORT_VALUES as readonly string[]).includes(value);
}

/** Проверка, что значение — допустимый размер страницы. */
export function isAllowedPageSize(value: number): value is CatalogPageSize {
    return (ALLOWED_PAGE_SIZES as readonly number[]).includes(value);
}

/** Проверка, что slug темы допустим. */
export function isAllowedServiceSlug(slug: string): boolean {
    return getAllowedServiceSlugs().has(slug);
}
