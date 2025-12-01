import { z } from "zod";

export const createHouseSchema = z.object({
  name: z.string().min(1, { message: "O nome da casa é obrigatório." }),
  logoUrl: z
    .string()
    .url({ message: "Por favor, insira uma URL válida para o logo." })
    .optional()
    .or(z.literal("")), // Permite string vazia como opcional
});

export type CreateHouseSchema = z.infer<typeof createHouseSchema>;