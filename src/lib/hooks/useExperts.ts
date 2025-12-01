import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./useAccount";
import agente from "../api/agents";
import type { ExpertCreate, ExpertDetail, ExpertList, ExpertUpdate } from "../types";

export const useExperts = (id?: string) => {
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();

    const { data: project, isLoading: isLoadingProject } = useQuery({
        queryKey: ['projects', id],
        queryFn: async () => {
            const response =  await agente.get<ExpertDetail>(`/experts/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
        select: (data) => {
            return {
                ...data,
                id: data.id,
                name: data.name,
                photoUrl: data.photoUrl,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                reports: data.reports.map(report => ({
                    ...report,
                    reportDate: new Date(report.reportDate).toISOString(),
                    expertId: report.expertId,
                    campaingId: report.campaingId,
                    analystId: report.analystId,
                    bookMakerId: report.bookMakerId,
                    id: report.id,
                    createdAt: report.createdAt,
                    updatedAt: report.updatedAt,
                })),
            };
        }
    });

    const { data: projects, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await agente.get<ExpertList[]>('/experts');
            return response.data;
        },
        enabled: !id && !!currentUser,
        // enabled: !id && location.pathname === '/projects' && !!currentUser,
        select: (data) => {
            return data.map(project => {
                return {
                    ...project
                }
            })
        }
    });

    const createExpert = useMutation({
        mutationFn: async (expert: ExpertCreate) => {
            const response = await agente.post(`/experts`, expert);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });

    const updateProject = useMutation({
        mutationFn: async (expert: ExpertUpdate) => {
            await agente.put(`/experts/${expert.id}`, expert);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['projects', id] });
        }
    });

    return {
        project,
        isLoadingProject,
        projects,
        isLoading,
        createExpert,
        updateProject
    }
}