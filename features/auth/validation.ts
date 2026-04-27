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
    email: z.string().email(),
    password: z
        .string()
        .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים")
        .max(16, "הסיסמה חייבת להכיל לכל היותר 16 תווים")
        .superRefine((val, ctx) => {
            if (!hasUppercase(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: "הוסף לפחות אות גדולה אחת",
                });
            }
            if (!hasLowercase(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: "הוסף לפחות אות קטנה אחת",
                });
            }
            if (!hasDigit(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: "הוסף לפחות ספרה אחת",
                });
            }
            if (!hasSpecial(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: "הוסף לפחות תו מיוחד אחד",
                });
            }
        }),
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
    email: z.string().email("Неверный формат email"),
    password: z.string().min(8).max(16),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
