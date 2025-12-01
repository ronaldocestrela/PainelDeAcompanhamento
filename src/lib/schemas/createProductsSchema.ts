import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, { message: "Nome do produto é obrigatório" }),
  externalId: z.string().optional(),
  hublaExternalId: z.string().optional(),
  expertId: z.string().min(1, { message: "Selecione um expert" }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const editProductSchema = z.object({
  name: z.string().min(1, { message: "Nome do produto é obrigatório" }),
  externalId: z.string().optional(),
  hublaExternalId: z.string().optional(),
});

export type EditProductSchema = z.infer<typeof editProductSchema>;
