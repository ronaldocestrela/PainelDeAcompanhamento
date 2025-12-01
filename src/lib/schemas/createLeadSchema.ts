import { z } from "zod";

export const createLeadSchema = z.object({
  date: z.string().min(1, { message: "Informe a data." }),
  registerCounts: z
    .number()
    .min(0, { message: "Registros deve ser zero ou mais." }),
  baseLeads: z
    .number()
    .min(0, { message: "Base Leads deve ser zero ou mais." }),
  expertId: z.string().min(1, { message: "Informe o Expert ID." }),
  analystId: z.string().min(1, { message: "Informe o Analyst ID." }),
});

export type CreateLeadSchema = z.infer<typeof createLeadSchema>;
