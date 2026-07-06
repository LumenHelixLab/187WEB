import { z } from "zod";

/**
 * Single source of truth for lead input validation. Shared shape so the API
 * and (optionally) the client agree on what a valid submission looks like.
 */
export const leadSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  message: z.string().trim().max(2000, "Keep it under 2000 characters.").optional(),
  source: z.string().trim().max(64).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
