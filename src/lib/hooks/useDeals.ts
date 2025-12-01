import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import agente from "../api/agents";
import type { Deal, CreateDealData } from "../types";

export const useDeals = () => {
  return useQuery<Deal[]>({
    queryKey: ["api/deals"],
    queryFn: async () => {
      const response = await agente.get<Deal[]>("/deals");
      return response.data;
    },
  });
};

export const useCreateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dealData: CreateDealData): Promise<Deal> => {
      const response = await agente.post<Deal>("/deals", dealData);
      return response.data;
    },
    onSuccess: () => {
      // Invalida a query de deals para recarregar a lista
      queryClient.invalidateQueries({ queryKey: ["api/deals"] });
    },
  });
};
