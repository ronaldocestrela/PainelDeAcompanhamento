import { z } from "zod";
import { requiredString } from "../util/utils";

export const createExpertSchema = z.object({
  name: requiredString("Nome do Expert"),
  photoUrl: z.string().url("URL inválida").optional().or(z.literal("")),
});

export type CreateExpertSchema = z.infer<typeof createExpertSchema>;
