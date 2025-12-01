import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./useAccount";
import agent from "../api/agents";
import type { Analyst, CreateAnalyst } from "../types"; 

export const useAnalystic = () => {
    // const queryClient = useQueryClient();
    const { currentUser } = useAccount();
    

    const { data: analyst, isLoading: isLoadingAnalyst } = useQuery({
        queryKey: ["users/list-analytics"],
        queryFn: async () => {
            const respnse = await agent.get<Analyst[]>('users/list-analytics');
            return respnse.data;
        },
        enabled: !!currentUser,
    });

    // const { data: analystByName, isLoading: isLoadingAnalystByName } = useQuery({
    //     queryKey: ["analyst", id],
    //     queryFn: async () => {
    //         const respnse = await agent.get<DeatailAnalyst>(`/analysts/name/${id}`);
    //         return respnse.data;
    //     },
    //     enabled: !!id && !!currentUser,
    //     select: data => {
    //         return {
    //             ...data
    //         };
    //     }
    // });

    // const { data: analystics, isLoading } = useQuery({
    //     queryKey: ["analysts"],
    //     queryFn: async() => {
    //         const response = await agent.get<DeatailAnalyst[]>("/analysts");
    //         return response.data;
    //     },
    //      enabled: !id && !!currentUser,
    //     select: data => {
    //         return data.map(analyst => ({
    //             ...analyst
    //         }));
    //     }
    // })

    // const createAnalystMutation = useMutation({ 
    //     mutationFn: async (analystData: CreateAnalyst) => {
           
    //         const response = await agent.post<DeatailAnalyst>("/analysts", analystData);
    //         return response.data;
    //     },
    //     onSuccess: async () => {
    //         await queryClient.invalidateQueries({ queryKey: ["analysts"] });
    //     },
    // });

    // const updateAnalyst = useMutation({
    //     mutationFn: async (analyst: DeatailAnalyst) => {
    //         await agent.put<DeatailAnalyst>(`/analysts/${analyst.id}`, analyst);
    //     },
    //     onSuccess: async () => {
    //         await queryClient.invalidateQueries({ queryKey: ["analysts"] });
    //         await queryClient.invalidateQueries({ queryKey: ["analysts", id] });
    //         await queryClient.invalidateQueries({ queryKey: ["analyst", id] });
    //     }
    // });

    return {
        analyst,
        isLoadingAnalyst,
        // analystByName,
        // isLoadingAnalystByName,
        // analystics,
        // isLoading,
        // updateAnalyst,
        // createAnalyst: createAnalystMutation,
    }
}
