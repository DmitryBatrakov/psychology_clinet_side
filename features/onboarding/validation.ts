import { z } from "zod";

const languagesEnum = z.enum(["he", "ru", "en", "uk", "ar"]);
const genderEnum = z.enum(["male", "female"]);

export const onboardingSchema = z.object({
    firstName: z.string().min(2).max(16),
    lastName: z.string().min(2).max(16),
    phoneNumber: z
        .string()
        .trim()
        .min(9)
        .max(13)
        .regex(/^\+?[0-9]{9,13}$/, "Неверный формат номера"),
    birthDate: z
        .date()
        .refine((d) => !Number.isNaN(d.getTime()), "Некорректная дата")
        .refine(
            (d) => d <= new Date(),
            "Дата рождения не может быть в будущем",
        ),
    gender: genderEnum,
    languages: z
        .array(languagesEnum)
        .min(1, "Выбери хотя бы один язык")
        .max(5, "Слишком много языков"),
    photoUrl: z.string().url().nullable().optional(),
});

export const onboardingApiSchema = z.object({
    firstName: z.string().min(2).max(16),
    lastName: z.string().min(2).max(16),
    phoneNumber: z
        .string()
        .trim()
        .min(9)
        .max(13)
        .regex(/^\+?[0-9]{9,13}$/),
    birthDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "birthDate must be YYYY-MM-DD"),
    gender: genderEnum,
    languages: z.array(languagesEnum).min(1).max(5),
    photoUrl: z.string().url().nullable().optional(),
});
