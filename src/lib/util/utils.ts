import { type DateArg, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { z } from "zod";

export function formatDate(date: DateArg<Date>){
    return format(date, "dd MMM yyyy HH:mm", { locale: ptBR })
}

export const requiredString = (fieldName: string) => z
    .string({required_error: `${fieldName} is required`})
    .min(1, {message: `${fieldName} is required`})