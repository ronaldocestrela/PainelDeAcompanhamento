import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./useAccount";
import agente from "../api/agents";
import type {
  CreateCampaing,
  CampaingList,
  CampaingDetail,
  CampaingUpdate,
} from "../types";

export const useCampaigns = (identifier?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();

  const { data: campaign, isLoading: isLoadingCampaign } = useQuery({
    queryKey: ["CampaingByName", identifier],
    queryFn: async () => {
      if (!identifier) return undefined;
      const response = await agente.get<CampaingDetail>(
        `/Campaign/name/${encodeURIComponent(identifier)}`
      );
      return response.data;
    },
    enabled: !!identifier && !!currentUser,
  });

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["Campaing"],
    queryFn: async () => {
      const response = await agente.get<CampaingList[]>("/Campaign");
      return response.data;
    },
    enabled: !identifier && !!currentUser,
  });

  const createCampaign = useMutation({
    mutationFn: async (campaignData: CreateCampaing) => {
      const response = await agente.post(`/Campaign`, campaignData);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["Campaign"] });
    },
  });

  const updateCampaign = useMutation({
    mutationFn: async (campaignData: CampaingUpdate) => {
      await agente.put(
        `/Campaign/update-campaign/${campaignData.id}`,
        campaignData
      );
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["Campaign"] });

      if (variables.name) {
        await queryClient.invalidateQueries({
          queryKey: ["CampaignByName", variables.name],
        });
      }
    },
  });

  return {
    campaign,
    isLoadingCampaign,
    campaigns,
    isLoading,
    createCampaign,
    updateCampaign,
  };
};
