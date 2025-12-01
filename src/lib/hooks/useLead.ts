import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./useAccount";
import { useLocation } from "react-router";
import agente from "../api/agents";
import { type ListLeads } from "../types";

export const useLead = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();
  const location = useLocation();

  const { data: lead, isLoading: isLoadingLead } = useQuery({
    queryKey: ["leadsReports", id],
    queryFn: async () => {
      const response = await agente.get<ListLeads>(
        `/api/leadsReports/list/${id}`
      );
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (data) => ({ ...data, id: data.id }),
  });

  return {
    lead,
    isLoadingLead,
  };
};
