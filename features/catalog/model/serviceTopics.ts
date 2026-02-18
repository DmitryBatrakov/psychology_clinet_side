import type { SpecialistDTO } from "@/features/specialist/model/types";

export interface ServiceTopicItem {
    value: string;
    label: string;
}

export interface ServiceTopicGroup {
    groupLabel: string;
    items: ServiceTopicItem[];
}

/** Темы/услуги по профессиям. Фильтр «Услуга» зависит от выбранной профессии. */
export const SERVICE_TOPICS_BY_PROFESSION: Record<
    SpecialistDTO["profession"],
    ServiceTopicGroup[]
> = {
    psychologist: [
        {
            groupLabel: "Эмоции и состояние",
            items: [
                { value: "trevozhnost", label: "Тревожность" },
                { value: "stress", label: "Стресс" },
                { value: "emotional-burnout", label: "Эмоциональное выгорание" },
                { value: "apatia-ustalost", label: "Апатия / усталость" },
                { value: "perepady-nastroyeniya", label: "Перепады настроения" },
                { value: "razdrazhitelnost-zlost", label: "Раздражительность / злость" },
            ],
        },
        {
            groupLabel: "Самооценка и личные кризисы",
            items: [
                { value: "nizkaya-samoocenka", label: "Низкая самооценка" },
                { value: "neuverennost-v-sebe", label: "Неуверенность в себе" },
                { value: "samoprinyatie", label: "Самопринятие" },
                { value: "chuvstvo-viny-styda", label: "Чувство вины / стыда" },
                { value: "samoopredelenie", label: "Самоопределение (кто я / куда дальше)" },
                { value: "vozrastnye-krizisy", label: "Возрастные / жизненные кризисы" },
            ],
        },
        {
            groupLabel: "Отношения и семья",
            items: [
                { value: "problemy-v-otnosheniyah", label: "Проблемы в отношениях" },
                { value: "konflikty-v-pare", label: "Конфликты в паре" },
                { value: "razvod-rasstavanie", label: "Развод / расставание" },
                { value: "odinochestvo", label: "Одиночество" },
                { value: "lichnye-granitsy", label: "Личные границы" },
                { value: "sozavisimost", label: "Созависимость / зависимые отношения" },
            ],
        },
        {
            groupLabel: "Детско-родительские темы",
            items: [
                { value: "otnosheniya-s-roditelyami", label: "Отношения с родителями" },
                { value: "vospitanie-detej", label: "Воспитание детей (как справляться)" },
                { value: "konflikty-v-seme", label: "Конфликты в семье" },
                { value: "trudnosti-s-podrostkom", label: "Трудности общения с подростком" },
            ],
        },
        {
            groupLabel: "Тяжёлый опыт и потери",
            items: [
                { value: "poterya-blizkogo", label: "Потеря близкого / горе" },
                { value: "travmaticheskij-opyt", label: "Травматический опыт (не клинический)" },
                { value: "adaptatsiya-pereezd", label: "Адаптация к переезду / эмиграции" },
            ],
        },
        {
            groupLabel: "Привычки и поведение",
            items: [
                { value: "prokrastinatsiya", label: "Прокрастинация" },
                { value: "samoorganizatsiya", label: "Самоорганизация" },
                { value: "navyazchivye-mysli", label: "Навязчивые мысли (без клиники)" },
                { value: "psihosomatika", label: "Психосоматика" },
            ],
        },
    ],
    therapist: [
        {
            groupLabel: "Эмоции и состояние",
            items: [
                { value: "trevozhnost", label: "Тревожность" },
                { value: "stress", label: "Стресс" },
                { value: "emotional-burnout", label: "Эмоциональное выгорание" },
                { value: "apatia-ustalost", label: "Апатия / усталость" },
                { value: "perepady-nastroyeniya", label: "Перепады настроения" },
                { value: "razdrazhitelnost-zlost", label: "Раздражительность / злость" },
            ],
        },
        {
            groupLabel: "Самооценка и личные кризисы",
            items: [
                { value: "nizkaya-samoocenka", label: "Низкая самооценка" },
                { value: "neuverennost-v-sebe", label: "Неуверенность в себе" },
                { value: "samoprinyatie", label: "Самопринятие" },
                { value: "chuvstvo-viny-styda", label: "Чувство вины / стыда" },
                { value: "samoopredelenie", label: "Самоопределение" },
                { value: "vozrastnye-krizisy", label: "Возрастные / жизненные кризисы" },
            ],
        },
        {
            groupLabel: "Отношения и семья",
            items: [
                { value: "problemy-v-otnosheniyah", label: "Проблемы в отношениях" },
                { value: "konflikty-v-pare", label: "Конфликты в паре" },
                { value: "razvod-rasstavanie", label: "Развод / расставание" },
                { value: "odinochestvo", label: "Одиночество" },
                { value: "lichnye-granitsy", label: "Личные границы" },
                { value: "sozavisimost", label: "Созависимость" },
            ],
        },
        {
            groupLabel: "Детско-родительские темы",
            items: [
                { value: "otnosheniya-s-roditelyami", label: "Отношения с родителями" },
                { value: "vospitanie-detej", label: "Воспитание детей" },
                { value: "konflikty-v-seme", label: "Конфликты в семье" },
                { value: "trudnosti-s-podrostkom", label: "Трудности с подростком" },
            ],
        },
        {
            groupLabel: "Тяжёлый опыт и потери",
            items: [
                { value: "poterya-blizkogo", label: "Потеря близкого / горе" },
                { value: "travmaticheskij-opyt", label: "Травматический опыт" },
                { value: "adaptatsiya-pereezd", label: "Адаптация к переезду / эмиграции" },
            ],
        },
        {
            groupLabel: "Привычки и поведение",
            items: [
                { value: "prokrastinatsiya", label: "Прокрастинация" },
                { value: "samoorganizatsiya", label: "Самоорганизация" },
                { value: "navyazchivye-mysli", label: "Навязчивые мысли" },
                { value: "psihosomatika", label: "Психосоматика" },
            ],
        },
        {
            groupLabel: "Тревожные и депрессивные расстройства",
            items: [
                { value: "trevozhnye-rasstrojstva", label: "Тревожные расстройства" },
                { value: "panicheskie-ataki", label: "Панические атаки" },
                { value: "depressivnye-sostoyaniya", label: "Депрессивные состояния / клиническая депрессия" },
                { value: "sotsialnaya-trevozhnost", label: "Социальная тревожность" },
            ],
        },
        {
            groupLabel: "Психотравма",
            items: [
                { value: "ptsr", label: "ПТСР" },
                { value: "posledstviya-nasiliya", label: "Последствия насилия / абьюза" },
                { value: "silnye-travmaticheskie-sobytiya", label: "Сильные травматические события" },
                { value: "emdr-travma", label: "EMDR / работа с травмой" },
            ],
        },
        {
            groupLabel: "Навязчивости и контроль",
            items: [
                { value: "okr", label: "ОКР" },
                { value: "fobii", label: "Фобии" },
                { value: "navyazchivye-sostoyaniya", label: "Навязчивые состояния" },
            ],
        },
        {
            groupLabel: "Расстройства личности и саморегуляция",
            items: [
                { value: "prl", label: "Пограничное расстройство личности (ПРЛ)" },
                { value: "rasstrojstva-lichnosti", label: "Расстройства личности" },
                { value: "emotsii-impulsivnost", label: "Сложности с эмоциями, импульсивность" },
            ],
        },
        {
            groupLabel: "Пищевое поведение",
            items: [
                { value: "rpp", label: "РПП (пищевые расстройства)" },
                { value: "kompulsivnoe-pereedanie", label: "Компульсивное переедание" },
                { value: "kontrol-vesa", label: "Контроль веса как симптом" },
            ],
        },
        {
            groupLabel: "Отношения и терапия для пар/семьи",
            items: [
                { value: "supruzheskaya-terapiya", label: "Супружеская терапия" },
                { value: "semeynaya-terapiya", label: "Семейная терапия" },
                { value: "seksualnye-trudnosti", label: "Сексуальные трудности в паре" },
            ],
        },
        {
            groupLabel: "Детская / подростковая психотерапия",
            items: [
                { value: "detskaya-psihoterapiya", label: "Детская психотерапия" },
                { value: "podrostkovaya-psihoterapiya", label: "Подростковая психотерапия" },
                { value: "trudnosti-povedeniya-adaptatsii", label: "Трудности поведения/адаптации" },
            ],
        },
        {
            groupLabel: "Подходы терапии",
            items: [
                { value: "cbt", label: "CBT" },
                { value: "geshtalt", label: "Гештальт" },
                { value: "psihoanaliz", label: "Психоанализ" },
                { value: "schema-terapiya", label: "Схема-терапия" },
                { value: "emdr", label: "EMDR" },
            ],
        },
    ],
    coach: [
        {
            groupLabel: "Цели и результаты",
            items: [
                { value: "postanovka-tselej", label: "Постановка целей" },
                { value: "dostizhenie-tselej", label: "Достижение целей" },
                { value: "plan-dejstvij", label: "План действий" },
                { value: "dolgosrochnoe-planirovanie", label: "Долгосрочное планирование" },
            ],
        },
        {
            groupLabel: "Продуктивность и привычки",
            items: [
                { value: "tajm-menedzhment", label: "Тайм-менеджмент" },
                { value: "samodistsiplina", label: "Самодисциплина" },
                { value: "prokrastinatsiya-kouching", label: "Прокрастинация (коучинг)" },
                { value: "privychki-rutina", label: "Привычки и рутина" },
            ],
        },
        {
            groupLabel: "Карьера и работа",
            items: [
                { value: "kariernyj-rost", label: "Карьерный рост" },
                { value: "smena-professii", label: "Смена профессии" },
                { value: "sobesedovaniya", label: "Подготовка к собеседованиям" },
                { value: "peregovory-zarplata", label: "Переговоры о зарплате" },
                { value: "adaptatsiya-novaya-rabota", label: "Адаптация на новой работе" },
            ],
        },
        {
            groupLabel: "Лидерство и управление",
            items: [
                { value: "liderstvo", label: "Лидерство" },
                { value: "upravlenie-komandoj", label: "Управление командой" },
                { value: "delegirovanie", label: "Делегирование" },
                { value: "prinyatie-reshenij", label: "Принятие решений" },
            ],
        },
        {
            groupLabel: "Бизнес и деньги",
            items: [
                { value: "biznes-kouching", label: "Бизнес-коучинг" },
                { value: "finansovye-tseli", label: "Финансовые цели" },
                { value: "strategiya-razvitiya", label: "Стратегия развития" },
                { value: "lichnyj-brend", label: "Личный бренд" },
            ],
        },
        {
            groupLabel: "Уверенность и коммуникация",
            items: [
                { value: "uverennost-kouching", label: "Уверенность в себе (коучинг)" },
                { value: "publichnye-vystupleniya", label: "Публичные выступления" },
                { value: "kommunikatsiya-soft-skills", label: "Коммуникация и soft skills" },
                { value: "lichnye-granitsy-obschenie", label: "Личные границы (в контексте общения)" },
            ],
        },
        {
            groupLabel: "Баланс и качество жизни",
            items: [
                { value: "work-life-balance", label: "Work-life balance" },
                { value: "energiya-resursnost", label: "Энергия и ресурсность" },
                { value: "profilaktika-vygoraniya", label: "Профилактика выгорания (коучинг)" },
            ],
        },
    ],
};

/** Все допустимые value услуг для фильтра (для проверки при смене профессии). */
export function getAllServiceValues(profession: SpecialistDTO["profession"]): Set<string> {
    const set = new Set<string>();
    for (const group of SERVICE_TOPICS_BY_PROFESSION[profession]) {
        for (const item of group.items) set.add(item.value);
    }
    return set;
}

/** Все допустимые slug'и тем (объединение по всем профессиям). Для валидации на бэке. */
export function getAllAllowedServiceSlugs(): Set<string> {
    const set = new Set<string>();
    for (const groups of Object.values(SERVICE_TOPICS_BY_PROFESSION)) {
        for (const group of groups) {
            for (const item of group.items) set.add(item.value);
        }
    }
    return set;
}

const _labelBySlug = new Map<string, string>();
function buildLabelMap() {
    if (_labelBySlug.size > 0) return;
    for (const groups of Object.values(SERVICE_TOPICS_BY_PROFESSION)) {
        for (const group of groups) {
            for (const item of group.items) {
                if (!_labelBySlug.has(item.value)) _labelBySlug.set(item.value, item.label);
            }
        }
    }
}

/** Подпись темы по slug (для отображения в карточке и т.п.). */
export function getServiceLabel(slug: string): string {
    buildLabelMap();
    return _labelBySlug.get(slug) ?? slug;
}
