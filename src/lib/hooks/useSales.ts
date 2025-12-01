import { useQuery } from "@tanstack/react-query";
import { useAccount } from "./useAccount";
import { useLocation } from "react-router";
import agente from "../api/agents";
import type { ListSales } from "../types";

export const useSales = (id?: string) => {
  const { currentUser } = useAccount();
  const location = useLocation();

  const { data: sales, isLoading: isLoadingSales } = useQuery({
    queryKey: ["sales", id],
    queryFn: async () => {
      const response = await agente.get<ListSales>(`/sales/${id}`);
      return response.data;
    },
    enabled: !!id && location.pathname === "/sales/" + id,
    select: (data) => {
      return {
        ...data,
        id: data.id,
      };
    },
  });

  const { data: allSalesData, isLoading: isLoadingAllSales } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const response = await agente.get<{
        totalValue: number;
        sales: ListSales[];
      }>("/sales/list-all");
      return response.data;
    },
    enabled: !!currentUser,
  });

  const getSalesByExpertId = (expertId?: string) => {
    const { data: expertSalesData, isLoading: isLoadingExpertSales } = useQuery(
      {
        queryKey: ["sales", "expert", expertId],
        queryFn: async () => {
          const now = new Date();
          const year = now.getFullYear();
          const initialDate = `${year}-01-01T00:00:00`;
          const finalDate = `${year}-12-31T23:59:59`;
          const url = `/sales/List-by-projectid?projectId=${expertId}&initalDate=${initialDate}&finalDate=${finalDate}`;
          try {
            const response = await agente.get<{
              totalValue: number;
              sales: ListSales[];
            }>(url);
            return response.data;
          } catch (error: any) {
            if (error?.response?.status === 404) {
              return { sales: [], totalValue: 0 };
            }
            console.error(
              "[useSales] Erro ao buscar vendas por expertId:",
              error
            );
            throw error;
          }
        },
        enabled: !!expertId && !!currentUser,
      }
    );
    return {
      expertSales: expertSalesData?.sales ?? [],
      expertTotalValue: expertSalesData?.totalValue ?? 0,
      isLoadingExpertSales,
    };
  };

  return {
    sales,
    isLoadingSales,
    allSales: allSalesData?.sales ?? [],
    totalValue: allSalesData?.totalValue ?? 0,
    isLoadingAllSales,
    getSalesByExpertId,
  };
};
