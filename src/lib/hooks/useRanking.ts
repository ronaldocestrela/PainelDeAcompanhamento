import { useQuery } from "@tanstack/react-query";
import agente from "../api/agents";

export interface SellerRank {
  sellerId: string;
  salerName: string;
  totalSales: number;
}


type RankingType = "day" | "month" | "all-time" | "period";

interface UseRankingOptions {
  type?: RankingType;
  start?: string;
  end?: string;
}

export const useRanking = (options: UseRankingOptions = {}) => {
  const { type = "day" } = options;

  const getUrl = () => {
    if (type === "day") return "/ranks/sellers/day";
    if (type === "month") return "/ranks/sellers/month";
    if (type === "all-time") return "/ranks/sellers/all-time";
    if (type === "period") {
      if (options.start && options.end) {
        return `/ranks/sellers/period/${encodeURIComponent(options.start)}/${encodeURIComponent(options.end)}`;
      }
      return "/ranks/sellers/period";
    }
    return "";
  };

  const {
    data: ranking,
    isLoading: isLoadingRanking,
    error: rankingError,
  } = useQuery<SellerRank[]>({
    queryKey: ["ranking", type, options.start, options.end],
    queryFn: async () => {
      const url = getUrl();
      if (!url) throw new Error("Parâmetros inválidos para ranking.");
      const response = await agente.get<SellerRank[]>(url);
      return response.data;
    },
    enabled: true,
  });

  return {
    ranking: ranking ?? [],
    isLoadingRanking,
    rankingError,
  };
};
