import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import agente from "../api/agents";
import type { MarketingAction, MarketingActionCreate, MarketingActionUpdate } from "../types";

export function useMarketingActions(expertId?: string) {
  const queryClient = useQueryClient();

  const { data: marketingActions, isLoading: isLoadingMarketingActions } =
    useQuery({
      queryKey: ["marketingActions", expertId],
      queryFn: async () => {
        if (!expertId) return [];
        const response = await agente.get<MarketingAction[]>(
          `/marketingactions/list-by-expert/${expertId}`
        );
        return response.data;
      },
      enabled: !!expertId,
    });

  const createMarketingAction = useMutation({
    mutationFn: async (data: MarketingActionCreate) => {
      const response = await agente.post("/marketingactions/create", data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["marketingActions"] });
    },
  });

  const updateMarketingAction = useMutation({
    mutationFn: async (data: MarketingActionUpdate) => {
      const response = await agente.put(`/marketingactions/update/${data.id}`, data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["marketingActions"] });
    },
  });

  return {
    marketingActions,
    isLoadingMarketingActions,
    createMarketingAction,
    updateMarketingAction,
  };
}
