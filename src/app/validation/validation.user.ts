import { z } from "zod";

const hasUppercase = (s: string) => [...s].some((ch) => ch >= "A" && ch <= "Z");
const hasLowercase = (s: string) => [...s].some((ch) => ch >= "a" && ch <= "z");
const hasDigit = (s: string) => [...s].some((ch) => ch >= "0" && ch <= "9");

const hasSpecial = (s: string) =>
    [...s].some((ch) => {
        const isLetter = (ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z");
        const isDigit = ch >= "0" && ch <= "9";
        return !isLetter && !isDigit;
    });

export const registerSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, "Пароль должен быть не менее 8 символов")
        .max(16, "Пароль должен быть не более 16 символов")
        .superRefine((val, ctx) => {
            if (!hasUppercase(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Добавьте хотя бы 1 заглавную букву",
                });
            }
            if (!hasLowercase(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Добавьте хотя бы 1 строчную букву",
                });
            }
            if (!hasDigit(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Добавьте хотя бы 1 цифру",
                });
            }
            if (!hasSpecial(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Добавьте хотя бы 1 спецсимвол",
                });
            }
        }),
});

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
            "Дата рождения не может быть в будущем"
        ),
    gender: genderEnum,
    languages: z
        .array(languagesEnum)
        .min(1, "Выбери хотя бы один язык")
        .max(5, "Слишком много языков"),
});

const MAX_MB = 5;
const MAX_SIZE = MAX_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const photoSchema = z.object({
    photoFile: z
        .instanceof(File, { message: "Выбери фото" })
        .refine((f) => f.size <= MAX_SIZE, `Макс размер ${MAX_MB}MB`)
        .refine((f) => ALLOWED_TYPES.includes(f.type), "Только JPG/PNG/WebP"),
});

export const loginSchema = z.object({
    email: z.email("Неверный формат email"),
    password: z.string().min(8).max(16),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
