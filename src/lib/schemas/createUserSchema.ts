import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  lastName: z.string().min(1, { message: "Sobrenome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "Confirmação de senha é obrigatória" }),
  role: z.string().min(1, { message: "Papel é obrigatório" }),
  expertId: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;