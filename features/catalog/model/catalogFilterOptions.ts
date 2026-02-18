import type { CatalogSort } from "./types";
import {
    ALLOWED_PROFESSIONS,
    ALLOWED_GENDERS,
    ALLOWED_MEETING_FORMATS,
    ALLOWED_LANGUAGES,
    ALLOWED_SORT_VALUES,
    type CatalogProfession,
} from "./catalogEnums";

export const PAGE_SIZE = 6;

/** Sentinel for "any / no filter" — Radix Select forbids empty string as item value */
export const FILTER_ANY = "any";

export const PROFESSION_OPTIONS: { value: CatalogProfession; label: string }[] = [
    { value: "psychologist", label: "Психологи" },
    { value: "therapist", label: "Психотерапевты" },
    { value: "coach", label: "Коучи" },
];

export const PROFESSION_SECTIONS: { key: CatalogProfession; title: string }[] = [
    { key: "psychologist", title: "Психологи" },
    { key: "therapist", title: "Психотерапевты" },
    { key: "coach", title: "Коучи" },
];

export const GENDER_OPTIONS: { value: string; label: string }[] = [
    { value: FILTER_ANY, label: "Любой" },
    ...ALLOWED_GENDERS.map((value) => ({
        value,
        label: value === "female" ? "Женский" : "Мужской",
    })),
];

const MEETING_FORMAT_LABELS: Record<(typeof ALLOWED_MEETING_FORMATS)[number], string> = {
    online: "Онлайн",
    offline: "Офлайн",
};
export const MEETING_FORMAT_OPTIONS: { value: string; label: string }[] = [
    { value: FILTER_ANY, label: "Любой" },
    ...ALLOWED_MEETING_FORMATS.map((value) => ({ value, label: MEETING_FORMAT_LABELS[value] })),
];

const LANGUAGE_LABELS: Record<(typeof ALLOWED_LANGUAGES)[number], string> = {
    he: "עברית",
    ru: "Русский",
    en: "English",
    uk: "Українська",
    ar: "العربية",
};
export const LANGUAGE_OPTIONS: { value: string; label: string }[] = [
    { value: FILTER_ANY, label: "Любой" },
    ...ALLOWED_LANGUAGES.map((value) => ({ value, label: LANGUAGE_LABELS[value] })),
];

export const PRICE_RANGE_OPTIONS: { value: string; label: string; priceMin?: number; priceMax?: number }[] = [
    { value: FILTER_ANY, label: "Любая" },
    { value: "0-150", label: "до ₪150", priceMin: 0, priceMax: 150 },
    { value: "150-200", label: "₪150–200", priceMin: 150, priceMax: 200 },
    { value: "200-300", label: "₪200–300", priceMin: 200, priceMax: 300 },
    { value: "300+", label: "₪300+", priceMin: 300 },
];

export const EXPERIENCE_OPTIONS: { value: string; label: string; experienceMin?: number }[] = [
    { value: FILTER_ANY, label: "Любой" },
    { value: "5", label: "5+ лет", experienceMin: 5 },
    { value: "10", label: "10+ лет", experienceMin: 10 },
];

const SORT_LABELS: Record<CatalogSort, string> = {
    default: "По умолчанию",
    experience_desc: "Опыт (сначала больше)",
    experience_asc: "Опыт (сначала меньше)",
    price_asc: "Цена (сначала ниже)",
    price_desc: "Цена (сначала выше)",
};
export const SORT_OPTIONS: { value: CatalogSort; label: string }[] = ALLOWED_SORT_VALUES.map(
    (value) => ({ value, label: SORT_LABELS[value] })
);
