import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./useAccount";
import agente from "../api/agents";
import type { ListBookmakers, CreateBookmakers } from "../types";

export const useHouses = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();

  const { data: house, isLoading: isLoadingHouse } = useQuery({
    queryKey: ["BookMakers", id],
    queryFn: async () => {
      const response = await agente.get<ListBookmakers>(`/bookmakers/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
  });

  const { data: houses, isLoading: isLoadingHouses } = useQuery({
    queryKey: ["BookMakers"],
    queryFn: async () => {
      const response = await agente.get<ListBookmakers[]>("bookmakers");
      return response.data;
    },
    enabled: !id && !!currentUser,
  });

  const createHouse = useMutation({
    mutationFn: async (houseData: CreateBookmakers) => {
      // Enviando o objeto completo para suportar criação com logo no futuro
      const response = await agente.post("bookmakers", houseData);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["BookMakers"] });
    },
  });

  const updateHouse = useMutation({
    mutationFn: async (houseData: {
      id: string;
      name: string;
      logoUrl?: string | null;
    }) => {
      const path = `bookmakers/${houseData.id}`;
      const body = {
        id: houseData.id,
        name: houseData.name,
        logoUrl: houseData.logoUrl,
      };
      await agente.put(path, body);
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["BookMakers"] });
      if (variables.id) {
        await queryClient.invalidateQueries({
          queryKey: ["BookMakers", variables.id],
        });
      }
    },
  });

  const deleteHouse = useMutation({
    mutationFn: async (id: string) => {
      await agente.delete(`bookmakers/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["BookMakers"] });
    },
  });

  const uploadLogo = useMutation({
    mutationFn: async (payload: { id: string; file: File }) => {
      const { id, file } = payload;
      const formData = new FormData();

      formData.append("file", file);
      const response = await agente.put(`bookmakers/add-logo/${id}`, formData);
      return response.data;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["BookMakers"] });
      if (variables.id) {
        await queryClient.invalidateQueries({
          queryKey: ["BookMakers", variables.id],
        });
      }
    },
  });

  return {
    house,
    isLoadingHouse,
    houses,
    isLoadingHouses,
    createHouse,
    updateHouse,
    deleteHouse,
    uploadLogo,
  };
};
