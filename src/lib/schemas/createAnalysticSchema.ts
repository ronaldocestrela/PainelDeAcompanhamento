import { z } from "zod";

export const createAnalystSchema = z.object({
  name: z.string().min(1, { message: "Nome do analista é obrigatório" }),
  photoUrl: z
    .string()
    .url({ message: "Deve ser uma URL válida se fornecida" })
    .or(z.literal(""))
    .optional(),
});

export type CreateAnalystSchema = z.infer<typeof createAnalystSchema>;