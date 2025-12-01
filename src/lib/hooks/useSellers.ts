import { useQuery } from "@tanstack/react-query";
import agente from "../api/agents";
import type { ListSeller } from "../types";

export const useSellers = () => {
  const {
    data: sellers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const response = await agente.get<ListSeller[]>("/users/list-sellers");
      return response.data;
    },
  });

  return { sellers, isLoading, error };
};
