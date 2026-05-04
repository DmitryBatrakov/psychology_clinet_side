import { z } from "zod";

export const inviteSchema = z.object({
    email: z.string().email("כתובת אימייל לא תקינה"),
    message: z.string().max(500).optional(),
});

export type InviteFormValues = z.infer<typeof inviteSchema>;
