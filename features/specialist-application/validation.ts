import { z } from "zod";

export const applicationSchema = z.object({
    firstName: z
        .string("שם פרטי חובה")
        .trim()
        .min(1, "שם פרטי חובה")
        .max(16, "16 מקסימום  תווים"),
    lastName: z
        .string("שם משפחה חובה")
        .trim()
        .min(1, "שם משפחה חובה")
        .max(16, "16 מקסימום תווים"),
    phoneNumber: z
        .string("מספר טלפון חובה")
        .trim()
        .min(9, "מספר טלפון חובה")
        .max(13, "13 מקסימום ספרות"),
    languages: z
        .array(z.enum(["he", "ru", "en", "ar"]))
        .min(1, "שפה חובה")
        .max(5, "מקסימום 5 שפות"),
    birthDate: z
        .string()
        .min(1, "תאריך לידה חובה")
        .refine((val) => {
            const date = new Date(val);
            const now = new Date();
            const age = now.getFullYear() - date.getFullYear();
            return age >= 18;
        }, "גיל מינימלי 18"),

    gender: z
        .union([z.enum(["male", "female"]), z.literal("")])
        .refine((value) => value !== "", { message: "מגדר חובה" }),

    profession: z
        .union([z.enum(["psychologist", "therapist", "coach"]), z.literal("")])
        .refine((value) => value !== "", { message: "מקצוע חובה" }),

    sessionTypes: z
        .array(z.enum(["individual", "couple", "child", "teen"]), {
            message: "סוגי פגישות חובה",
        })
        .min(1, "סוגי פגישות חובה")
        .max(4, "מקסימום 4 סוגי פגישות"),
    experience: z.string("שנות ניסיון חובה").min(1, "מינימום 1 שנה").max(10, "מקסימום 10 שנות ניסיון"),
    pricePerSession: z
        .string("מחיר למפגש חובה")
        .min(1, "מחיר למפגש חובה")
        .max(10, "מקסימום 1000 שקלים"),
    hoursPerWeek: z
        .string("שעות זמינות בשבוע חובה")
        .min(1, "שעות זמינות בשבוע חובה")
        .max(100, "מקסימום 80 שעות"),
    passportId: z
        .string("מספר ת.ז. חובה")
        .trim()
        .regex(/^\d{9}$/, "מספר ת.ז. חייב להכיל 9 ספרות"),
    basicDegree: z
        .array(z.custom<File>())
        .min(1, "תעודה בסיסית חובה")
        .max(3, "מקסימום 3 קבצים"),
    advancedDegree: z
        .array(z.custom<File>())
        .max(3, "מקסימום 3 קבצים")
        .optional(),
    agree: z.boolean().refine((value) => value === true, { message: "אישור חובה" }),
});

export type ApplicationSchema = z.input<typeof applicationSchema>;

export const createSpecialistApplicationSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(20),
    lastName: z.string().min(1, "Last name is required").max(20),
    phoneNumber: z.string().min(9).max(13),
    languages: z
        .array(z.enum(["he", "ru", "en", "ar"]))
        .min(1)
        .max(5),
    birthDate: z.string().min(1),
    gender: z.enum(["male", "female"]),
    profession: z.enum(["psychologist", "therapist", "coach"]),
    sessionTypes: z
        .array(z.enum(["individual", "couple", "child", "teen"]))
        .min(1)
        .max(4),
    experience: z.string().min(1).max(10),
    pricePerSession: z.string().min(1).max(10),
    hoursPerWeek: z.string().min(1).max(100),
    passportId: z.string().regex(/^\d{9}$/),
    basicDegreeUrls: z.array(z.string().url()).min(1).max(3),
    advancedDegreeUrls: z.array(z.string().url()).max(3).optional(),
    agree: z.literal(true),
}).strict();

export type CreateSpecialistApplicationSchema = z.infer<
    typeof createSpecialistApplicationSchema
>;
