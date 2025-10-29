import { z } from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, 'Name must not exceed 100 characters')
        .trim(),
    phone: z
        .string()
        .min(1, 'Phone is required')
        .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
        .trim(),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format')
        .max(100, 'Email must not exceed 100 characters')
        .trim()
        .toLowerCase(),
});

export type ContactFormInput = z.infer<typeof contactSchema>;

export const searchSchema = z.object({
    query: z.string().min(1, "Search query is required").max(100),
});

export type SearchInput = z.infer<typeof searchSchema>