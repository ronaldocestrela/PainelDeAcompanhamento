import { useMutation } from "@tanstack/react-query";
import agente from "../../lib/api/agents";

type RecalculateReportsPayload = {
  bookmakerId: string;
  StartDate: string;
  EndDate: string;
};

export const useReports = () => {
  const recalculateReports = useMutation({
    mutationFn: async (payload: RecalculateReportsPayload) => {
      const response = await agente.post("/reports/recalculate-reports", payload);
      return response.data;
    },
  });

  return {
    recalculateReports,
  };
};