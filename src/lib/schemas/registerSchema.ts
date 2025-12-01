import { z } from "zod";
import { requiredString } from "../util/utils";

export const registerSchema = z.object({
  name: requiredString("name"),
  lastName: requiredString("lastName"),
  email: z.string().email(),
  password: requiredString("password"),
  isActive: z.boolean().default(true),
  isSaler: z.boolean().default(false),
  isAnalyst: z.boolean().default(false),
  roleUser: requiredString("roleUser"),
  imageUrl: z.string().optional().nullable(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
