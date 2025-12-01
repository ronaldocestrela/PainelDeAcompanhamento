import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import { useAccount } from "../../lib/hooks/useAccount";
import { PersonalInfoCard } from "./PersonalInfoCard";
import { BioCard } from "./BioCard";
import { PortfolioCard } from "./PortfolioCard";
import { SellerAchievements } from "./Tabs/SellerAchievements";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MyProfile() {
  const { id } = useParams();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [editMode, setEditMode] = useState(false);
  const { currentUser } = useAccount();
  const { profile, loadingProfile, uploadPhoto, updateProfile } = useProfile(
    id ?? currentUser?.id
  );

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto.mutate(file, {
      onSuccess: () => {
        setEditMode(false);
      },
    });
  };

  const handleSaveProfile = (data: {
    name?: string;
    lastName?: string;
    email?: string;
  }) => {
    if (!data.name || !data.lastName || !data.email) {
      toast.error("Todos os campos são obrigatórios");
      return;
    }

    updateProfile.mutate(
      {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
      },
      {
        onSuccess: () => {
          toast.success("Perfil atualizado com sucesso!");
        },
        onError: (error) => {
          console.error("Profile update failed:", error);
          toast.error("Erro ao atualizar perfil. Tente novamente.");
        },
      }
    );
  };

  if (loadingProfile)
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
        {" "}
        Loding Profile ...
      </Typography>
    );

  if (!profile)
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
        {" "}
        Profile not found.
      </Typography>
    );

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <PersonalInfoCard
          imageUrl={profile?.imageUrl}
          name={profile?.name}
          lastName={profile?.lastName}
          roleName={profile?.roleName}
          email={profile?.email}
          isMdUp={isMdUp}
          editMode={editMode}
          uploadPhoto={handlePhotoUpload}
          loading={uploadPhoto.isPending || updateProfile.isPending}
          onSave={handleSaveProfile}
        />

        <BioCard />

        <PortfolioCard />

        {currentUser?.roleName?.toLocaleLowerCase() === "seller" && (
          <SellerAchievements />
        )}
        {currentUser?.roleName?.toLocaleLowerCase() === "admin" && (
          <SellerAchievements />
        )}
      </Stack>
    </Box>
  );
}
