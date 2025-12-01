import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agente from "../api/agents";
import type { Photo, Profile, User } from "../types";

export const useProfile = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await agente.get<Profile>(`/profiles/${id}`);
      return response.data;
    },
  });

  const uploadPhoto = useMutation({
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await agente.post(`/profiles/add-photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: async (photo: Photo) => {
      await queryClient.invalidateQueries({
        queryKey: ["photos", id],
      });
      queryClient.setQueryData(["user"], (data: User) => {
        if (!data) return data;
        return {
          ...data,
          imageUrl: data.imageUrl ?? photo.url,
        };
      });
      queryClient.setQueryData(["profile", id], (data: Profile) => {
        if (!data) return data;
        return {
          ...data,
          imageUrl: photo.url,
        };
      });
    },
  });

  const setMainPhoto = useMutation({
    mutationFn: async (photoId: string) => {
      const response = await agente.put(`/profiles/${photoId}/set-main-photo`);
      return response.data;
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (profileData: {
      name: string;
      lastName: string;
      email: string;
    }) => {
      const response = await agente.put(
        `/profiles/update-profile`,
        profileData
      );
      return response.data;
    },
    onSuccess: async (updatedProfile: any, variables) => {
      const profileToUpdate =
        updatedProfile && Object.keys(updatedProfile).length > 0
          ? updatedProfile
          : variables;

      queryClient.setQueryData(["profile", id], (oldData: Profile) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          name: profileToUpdate.name,
          lastName: profileToUpdate.lastName,
          email: profileToUpdate.email,
        };
      });

      queryClient.setQueryData(["user"], (data: User) => {
        if (!data || data.id !== id) return data;
        return {
          ...data,
          name: profileToUpdate.name,
          lastName: profileToUpdate.lastName,
          email: profileToUpdate.email,
        };
      });

      await queryClient.invalidateQueries({
        queryKey: ["profile", id],
      });
    },
  });

  return {
    profile,
    loadingProfile,
    uploadPhoto,
    setMainPhoto,
    updateProfile,
  };
};
