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
      await agent.post("/login?useCookies=true", creds);
    },
    onSuccess: async () => {
      await queryClinet.invalidateQueries({
        queryKey: ["user"],
      });
    },
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
      const response = await agent.get<User>("/account/user-info");
      return response.data;
    },
    enabled:
      !queryClinet.getQueryData(["user"]) &&
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/signin",
  });

  return {
    loginUser,
    currentUser,
    logoutUser,
    loadinUserInfo,
    registerUser,
  };
};
