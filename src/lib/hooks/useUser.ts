import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";

import agente from "../api/agents";
import type { ListUsers, CreateUserPayload } from "../types";
import { useAccount } from "./useAccount";

export const useUser = (id?: string) => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const { currentUser } = useAccount();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await agente.get<ListUsers>(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
    select: (data) => {
      return {
        ...data,
        id: data.id,
      };
    },
  });

  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useQuery<ListUsers[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await agente.get<ListUsers[]>("/users/list-all");
      return response.data;
    },
    enabled:
      (location.pathname === "/users/" && !!currentUser) ||
      location.pathname === "/users",
  });

  const createUserMutation = useMutation({
    mutationFn: async (userData: CreateUserPayload) => {
      const response = await agente.post('/account/new-user', userData);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: async (passwordData: { UserId: string; NewPassword: string }) => {
      const response = await agente.put('/account/update-password', passwordData);
      return response.data;
    },
  });

  return {
    user,
    isLoadingUser,
    users,
    isLoadingUsers,
    refetchUsers,
    createUser: createUserMutation,
    updatePassword: updatePasswordMutation,
  };
}