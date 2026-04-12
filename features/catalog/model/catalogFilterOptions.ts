import type { CatalogSort } from "./types";
import {
    ALLOWED_GENDERS,
    ALLOWED_MEETING_FORMATS,
    ALLOWED_LANGUAGES,
    ALLOWED_SESSION_TYPES,
    ALLOWED_SORT_VALUES,
    type CatalogProfession,
} from "./catalogEnums";

export const PAGE_SIZE = 6;

/** Sentinel for "any / no filter" — Radix Select forbids empty string as item value */
export const FILTER_ANY = "any";

export const PROFESSION_OPTIONS: { value: CatalogProfession; label: string }[] = [
    { value: "psychologist", label: "פסיכולוגים" },
    { value: "therapist", label: "פסיכותרפיסטים" },
    { value: "coach", label: "מאמנים" },
];

export const PROFESSION_SECTIONS: { key: CatalogProfession; title: string }[] = [
    { key: "psychologist", title: "פסיכולוגים" },
    { key: "therapist", title: "פסיכותרפיסטים" },
    { key: "coach", title: "מאמנים" },
];

export const GENDER_OPTIONS: { value: string; label: string }[] = [
    { value: FILTER_ANY, label: "כל" },
    ...ALLOWED_GENDERS.map((value) => ({
        value,
        label: value === "female" ? "נקבה" : "זכר",
    })),
];

const MEETING_FORMAT_LABELS: Record<(typeof ALLOWED_MEETING_FORMATS)[number], string> = {
    online: "אונליין",
    offline: "פרונטלי",
};
export const MEETING_FORMAT_OPTIONS: { value: string; label: string }[] = [
    { value: FILTER_ANY, label: "כל" },
    ...ALLOWED_MEETING_FORMATS.map((value) => ({ value, label: MEETING_FORMAT_LABELS[value] })),
];

const SESSION_TYPE_LABELS: Record<(typeof ALLOWED_SESSION_TYPES)[number], string> = {
    individual: "אינדיבידואלית",
    couple: "זוגית",
    child: "ילדים עד 12",
    teen: "נוער 12–18",
};
export const SESSION_TYPE_OPTIONS: { value: string; label: string }[] = [
    { value: FILTER_ANY, label: "כל" },
    ...ALLOWED_SESSION_TYPES.map((value) => ({ value, label: SESSION_TYPE_LABELS[value] })),
];

const LANGUAGE_LABELS: Record<(typeof ALLOWED_LANGUAGES)[number], string> = {
    he: "עברית",
    ru: "רוסית",
    en: "אנגלית",
    ar: "ערבית",
};
export const LANGUAGE_OPTIONS: { value: string; label: string }[] = [
    { value: FILTER_ANY, label: "כל" },
    ...ALLOWED_LANGUAGES.map((value) => ({ value, label: LANGUAGE_LABELS[value] })),
];

export const PRICE_RANGE_OPTIONS: { value: string; label: string; priceMin?: number; priceMax?: number }[] = [
    { value: FILTER_ANY, label: "כל" },
    { value: "0-150", label: "עד ₪150", priceMin: 0, priceMax: 150 },
    { value: "150-200", label: "₪150–200", priceMin: 150, priceMax: 200 },
    { value: "200-300", label: "₪200–300", priceMin: 200, priceMax: 300 },
    { value: "300+", label: "₪300+", priceMin: 300 },
];

const SORT_LABELS: Record<CatalogSort, string> = {
    default: "ברירת מחדל",
    experience_desc: "ניסיון (גבוה לראשון)",
    experience_asc: "ניסיון (נמוך לראשון)",
    price_asc: "מחיר (נמוך לראשון)",
    price_desc: "מחיר (גבוה לראשון)",
};
export const SORT_OPTIONS: { value: CatalogSort; label: string }[] = ALLOWED_SORT_VALUES.map(
    (value) => ({ value, label: SORT_LABELS[value] })
);
