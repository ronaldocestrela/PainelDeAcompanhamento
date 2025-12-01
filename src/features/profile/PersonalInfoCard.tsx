import {
  Card,
  Box,
  Typography,
  Divider,
  CardActions,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import PersonalInfoCardInfo from "./PersonalInfoCardInfo";
import { PersonalInfoCardInfoMobile } from "./PersonalInfoCardInfoMobile";

interface PersonalInfoCardProps {
  imageUrl?: string;
  name?: string;
  lastName?: string;
  roleName?: string;
  email?: string;
  isMdUp: boolean;
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
  onSave?: (data: { name?: string; lastName?: string; email?: string }) => void;
}

export const PersonalInfoCard = ({
  imageUrl,
  name,
  lastName,
  roleName,
  email,
  isMdUp,
  uploadPhoto,
  loading,
  onSave,
}: PersonalInfoCardProps) => {
  const [formData, setFormData] = useState({
    name: name || "",
    lastName: lastName || "",
    email: email || "",
  });

  useEffect(() => {
    setFormData({
      name: name || "",
      lastName: lastName || "",
      email: email || "",
    });
  }, [name, lastName, email]);

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">Informações Pessoais</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {isMdUp ? (
        <PersonalInfoCardInfo
          imageUrl={imageUrl}
          name={formData.name}
          lastName={formData.lastName}
          roleName={roleName}
          email={formData.email}
          uploadPhoto={uploadPhoto}
          loading={loading}
          editMode={true}
          onFieldChange={handleFieldChange}
        />
      ) : (
        <PersonalInfoCardInfoMobile
          imageUrl={imageUrl}
          name={formData.name}
          lastName={formData.lastName}
          roleName={roleName}
          email={formData.email}
          editMode={true}
          onFieldChange={handleFieldChange}
        />
      )}
      <Divider sx={{ mt: 2 }} />
      <CardActions sx={{ justifyContent: "flex-end", pt: 2 }}>
        <Button size="small" variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </CardActions>
    </Card>
  );
};
