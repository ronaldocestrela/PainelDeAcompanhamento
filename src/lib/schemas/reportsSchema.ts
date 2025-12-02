import { z } from "zod";

export const recalculateReportsSchema = z.object({
  bookmakerId: z.string().uuid("Selecione uma casa de apostas válida"),
  startDate: z.string().min(1, "Data inicial é obrigatória"),
  endDate: z.string().min(1, "Data final é obrigatória"),
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 31;
}, {
  message: "O período entre as datas não pode exceder 31 dias",
  path: ["endDate"],
});

export type RecalculateReportsSchema = z.infer<typeof recalculateReportsSchema>;