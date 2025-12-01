import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./useAccount";
import agente from "../api/agents";
import type { Product, ProductCreate, ProductDetail } from "../types";
import { toast } from "react-toastify";

export const useProducts = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await agente.get<ProductDetail>(`/products/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await agente.get<Product[]>("/products/list");
      return response.data;
    },
    enabled: !id && !!currentUser,
  });

  const createProduct = useMutation({
    mutationFn: async (productData: ProductCreate) => {
      const response = await agente.post(
        "/products/create-product-by-populator/",
        productData
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async (payload: {
      id: string;
      name: string;
      externalId: string;
      expertId: string;
    }) => {
      const { id, name, externalId, expertId } = payload;
      try {
        await agente.put(`/products/update/${id}`, {
          id,
          name,
          externalId,
          expertId,
        });
      } catch (error) {
        toast.error("Falha ao atualizar produto!");
        throw error;
      }
    },
    onSuccess: async (_, variables) => {
      toast.success("Produto atualizado com sucesso!");
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      if (variables.id) {
        await queryClient.invalidateQueries({
          queryKey: ["products", variables.id],
        });
      }
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      await agente.delete(`products/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    product,
    products,
    isLoadingProduct,
    isLoadingProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
