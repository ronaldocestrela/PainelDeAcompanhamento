import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type LoginSchema } from "../schemas/loginSchema.ts";
import agent from "../api/agents";
import { type User } from "../types";
import { useLocation, useNavigate } from "react-router";
import { type RegisterSchema } from "../schemas/registerSchema.ts";
import { toast } from "react-toastify";

export const useAccount = () => {
  const queryClinet = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const loginUser = useMutation({
    mutationFn: async (creds: LoginSchema) => {
      console.log('🚀 Iniciando login...');
      const response = await agent.post("/login?useCookies=true", creds);
      console.log('✅ Login realizado com sucesso:', response.status);
      return response.data;
    },
    onSuccess: async () => {
      console.log('🔄 Invalidando queries e buscando informações do usuário...');
      // Invalida e força uma nova busca das informações do usuário
      await queryClinet.invalidateQueries({
        queryKey: ["user"],
      });
      await queryClinet.refetchQueries({
        queryKey: ["user"],
      });
    },
    onError: (error: any) => {
      console.log('❌ Erro no login:', error?.response?.status, error?.message);
    }
  });

  const registerUser = useMutation({
    mutationFn: async (creds: RegisterSchema) => {
      await agent.post("/account/register", creds);
    },
    onSuccess: () => {
      toast.success("Usuário registrado com sucesso!");
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post("/account/logout");
    },
    onSuccess: () => {
      queryClinet.removeQueries({ queryKey: ["user"] });
      queryClinet.removeQueries({ queryKey: ["activities"] });
      navigate("/");
    },
  });

  const { data: currentUser, isLoading: loadinUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        console.log('🔍 Buscando informações do usuário...');
        const response = await agent.get<User>("/account/user-info");
        console.log('✅ Usuário encontrado:', response.data);
        return response.data;
      } catch (error: any) {
        console.log('❌ Erro ao buscar usuário:', error?.response?.status);
        // Se não conseguir buscar o usuário, remove qualquer dado em cache
        queryClinet.removeQueries({ queryKey: ["user"] });
        throw error;
      }
    },
    enabled:
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/signin",
    retry: (failureCount, error: any) => {
      // Não tenta novamente se for erro 401 (não autorizado)
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    loginUser,
    currentUser,
    logoutUser,
    loadinUserInfo,
    registerUser,
  };
};
