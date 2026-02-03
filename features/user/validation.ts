import { z } from "zod";

const GenderSchema = z.enum(["male", "female"]);
const LanguageSchema = z.enum(["he", "ru", "en", "uk", "ar"]);

export const updateProfileFormSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phoneNumber: z.string().min(5).optional(),

  birthDate: z
    .date()
    .refine((d) => !Number.isNaN(d.getTime()), "Некорректная дата")
    .refine((d) => d <= new Date(), "Дата рождения не может быть в будущем")
    .optional(),

  gender: GenderSchema.optional(),
  languages: z.array(LanguageSchema).optional(),
  photoUrl: z.string().nullable().optional(),
});

export const updateProfileApiSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phoneNumber: z.string().min(5).optional(),

  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Неверный формат даты (yyyy-MM-dd)")
    .transform((s) => new Date(`${s}T00:00:00.000Z`))
    .refine((d) => !Number.isNaN(d.getTime()), "Некорректная дата")
    .refine((d) => d <= new Date(), "Дата рождения не может быть в будущем")
    .optional(),

  gender: GenderSchema.optional(),
  languages: z.array(LanguageSchema).optional(),
  photoUrl: z.string().nullable().optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileFormSchema>;
export type UpdateProfileApiValues = z.infer<typeof updateProfileApiSchema>;
export type UpdateProfileApiInput = z.input<typeof updateProfileApiSchema>;