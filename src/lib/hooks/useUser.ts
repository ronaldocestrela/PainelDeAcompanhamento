import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";

import agente from "../api/agents";
import type { ListUsers } from "../types";
import { useAccount } from "./useAccount";

export const useUser = (id?: string) => {
  const location = useLocation();

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

  return {
    user,
    isLoadingUser,
    users,
    isLoadingUsers,
    refetchUsers,
  };
}