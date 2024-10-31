import { z } from 'zod';

export const createEmailSchema = z.object({
  sender: z.string().min(1,{ message: "Sender cannot be empty" }),
  recipient: z.string().min(1,{ message: "Recipient cannot be empty" }),
  subject: z.string().optional().nullable(),
  content: z.string().max(4000, { message: "Content must be at most 4000 characters long" }).optional().nullable(),
});

export const filterEmailsSchema = z.object({
  id: z.string().optional().nullable().transform(val => val || undefined),
  email: z.string().email({ message: "Invalid email format" }).optional().nullable(),
  subject: z.string().optional().nullable().transform(val => val || undefined),
  read: z.boolean().optional().nullable(),
  page: z.number().int().min(1, { message: "Page must be at least 1" }).optional().nullable(),
  limit: z.number().int().min(1, { message: "Limit must be at least 1" }).optional().nullable(),
});


export const updateEmailSchema = z.object({
  emailId: z.string().min(1,{ message: "Email ID cannot be empty" }),
  read: z.boolean({ message: "Read must be a boolean" }),
});
