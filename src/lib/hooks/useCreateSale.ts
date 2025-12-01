import { useMutation, useQueryClient } from "@tanstack/react-query";
import agente from "../api/agents";

export interface CreateSaleDto {
  SaleDate: string;
  Price: number;
  ProductId: string;
  SellerId: string;
}

export function useCreateSale() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sale: CreateSaleDto) => {
      const response = await agente.post("/sales/create", sale);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
}
