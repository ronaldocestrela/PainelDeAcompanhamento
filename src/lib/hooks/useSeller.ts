import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import agente from "../api/agents";

export type Seller = {
  id: string;
  imageUrl: string;
  name: string;
  lastName: string;
  isActive: boolean;
  isSaler: boolean;
};

export type CreateSeller = Omit<Seller, "id">;

export function useSeller() {
  const queryClient = useQueryClient();
  const {
    data: sellers = [],
    isLoading: isLoadingSellers,
    error,
  } = useQuery<Seller[]>({
    queryKey: ["sellers"],
    queryFn: async () => {
      const response = await agente.get<Seller[]>("/seller/list");
      return response.data;
    },
  });

  const createSeller = useMutation({
    mutationFn: async (sellerData: CreateSeller) => {
      const response = await agente.post<Seller>("/seller/create", sellerData);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sellers"] });
    },
  });

  const updateSeller = useMutation({
    mutationFn: async (seller: Seller) => {
      await agente.put<Seller>(`/seller/update/${seller.id}`, seller);
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["sellers"] });
      if (variables && variables.id) {
        await queryClient.invalidateQueries({
          queryKey: ["sellers", variables.id],
        });
      }
    },
  });

  return { sellers, isLoadingSellers, error, createSeller, updateSeller };
}
