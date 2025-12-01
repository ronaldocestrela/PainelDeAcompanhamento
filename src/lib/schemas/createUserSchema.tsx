import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  email: z.string().email("Email inválido"),
  imageUrl: z
    .string()
    .url("URL da imagem inválida")
    .optional()
    .or(z.literal("")),
  role: z.string().min(1, "Papel é obrigatório"),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
