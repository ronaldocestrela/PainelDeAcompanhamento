import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(1, { message: "Nome da empresa é obrigatório" }),
  host: z.string().min(1, { message: "Host é obrigatório" }),
  tituloPagina: z.string().min(1, { message: "Título da página é obrigatório" }),
  logoHeader: z.instanceof(File).optional(),
  logoMenuLateral: z.instanceof(File).optional(),
  favicon: z.instanceof(File).optional(),
  logoLogin: z.instanceof(File).optional(),
});

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;