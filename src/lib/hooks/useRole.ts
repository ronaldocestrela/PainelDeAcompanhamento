import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router";
import agente from "../api/agents";
import type { ListRoles } from "../types";

export const useRole = (id?: string) => {
    const location = useLocation();

    const { data: role, isLoading: isLoadingRole } = useQuery({
        queryKey: ['roles', id],
        queryFn: async () => {
            const response = await fetch(`/roles/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        enabled: !!id,
        select: (data) => {
            return {
                ...data,
                id: data.id,
            };
        }
    });

    const { data: roles, isLoading: isLoadingRoles } = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const response = await agente.get<ListRoles[]>('/roles/list-all');
            return response.data;
        },
        enabled: location.pathname === "/users/" || location.pathname === "/users",
    });

    return {
        role,
        isLoadingRole,
        roles,
        isLoadingRoles
    }
}