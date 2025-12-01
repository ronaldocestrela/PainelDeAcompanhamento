import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
  Stack,
  Avatar,
  InputAdornment,
  Modal,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";
import ImageUploadWidget from "../../app/shared/components/ImageUploadWidget";

interface PersonalInfoCardProps {
  imageUrl?: string;
  name?: string;
  lastName?: string;
  roleName?: string;
  email?: string;
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
  editMode?: boolean;
  onFieldChange?: (field: string, value: string) => void;
}

export default function PersonalInfoCardInfo({
  imageUrl,
  name,
  lastName,
  roleName,
  email,
  uploadPhoto,
  loading,
  editMode,
  onFieldChange,
}: PersonalInfoCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Stack direction="row" spacing={3} sx={{ my: 1 }}>
      <Box sx={{ position: "relative", width: 120, height: 120 }}>
        <Avatar src={imageUrl} alt="Profile" sx={{ width: 120, height: 120 }} />
        <IconButton
          aria-label="upload new picture"
          size="small"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "background.paper",
            boxShadow: 1,
          }}
          onClick={() => setOpen(true)}
        >
          <EditRoundedIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: { xs: "90%", sm: "80%", md: "60%" },
            }}
          >
            <ImageUploadWidget uploadPhoto={uploadPhoto} loading={loading} />
          </Box>
        </Modal>
      </Box>
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          <FormLabel>Nome</FormLabel>
          <Stack direction="row" spacing={2}>
            <TextField
              size="small"
              placeholder="Primeiro nome"
              value={name || ""}
              disabled={!editMode}
              onChange={(e) => onFieldChange?.("name", e.target.value)}
            />
            <TextField
              size="small"
              placeholder="Sobrenome"
              value={lastName || ""}
              sx={{ flexGrow: 1 }}
              disabled={!editMode}
              onChange={(e) => onFieldChange?.("lastName", e.target.value)}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <FormControl>
            <FormLabel>Cargo</FormLabel>
            <TextField size="small" value={roleName || ""} disabled />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Email</FormLabel>
            <TextField
              size="small"
              type="email"
              placeholder="email"
              value={email || ""}
              disabled={!editMode}
              onChange={(e) => onFieldChange?.("email", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRoundedIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
            />
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  );
}
