import { z } from "zod";
import { requiredString } from "../util/utils";

export const createCampaingSchema = z.object({
  Name: requiredString("Nome da Campanha"),
  ExpertId: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().uuid("ID do Expert inválido").nullable()
  ),
  AnalystId: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().uuid("ID do Analista inválido").nullable()
  ),
  BookmakerId: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().uuid("ID da Bookmaker inválido").nullable()
  ),
});

export const updateCampaingSchema = z.object({
  Name: requiredString("Nome da Campanha"),
  ExpertId: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().uuid("ID do Expert inválido").nullable()
  ),
  AnalystId: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().uuid("ID do Analista inválido").nullable()
  ),
  BookmakerId: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().uuid("ID da Bookmaker inválido").nullable()
  ),
});

export type CreateCampaingSchema = z.infer<typeof createCampaingSchema>;
export type UpdateCampaingSchema = z.infer<typeof updateCampaingSchema>;
