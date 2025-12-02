import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./useAccount";
import agent from "../api/agents";
import type { Company } from "../types";
import type { CreateCompanySchema } from "../schemas/createCompanySchema";

export const useCompanies = () => {
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();

    const { data: companies, isLoading: isLoadingCompanies } = useQuery({
        queryKey: ["companies"],
        queryFn: async () => {
            const response = await agent.get<Company[]>('/Companies');
            return response.data;
        },
        enabled: !!currentUser,
    });

    const createCompanyMutation = useMutation({
        mutationFn: async (companyData: CreateCompanySchema) => {
            const formData = new FormData();
            formData.append('name', companyData.name);
            formData.append('host', companyData.host);
            formData.append('tituloPagina', companyData.tituloPagina);
            if (companyData.logoHeader) formData.append('logoHeader', companyData.logoHeader);
            if (companyData.logoMenuLateral) formData.append('logoMenuLateral', companyData.logoMenuLateral);
            if (companyData.favicon) formData.append('favicon', companyData.favicon);
            if (companyData.logoLogin) formData.append('logoLogin', companyData.logoLogin);

            const response = await agent.post<Company>('/Companies', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["companies"] });
        },
    });

    return {
        companies,
        isLoadingCompanies,
        createCompany: createCompanyMutation,
    }
}