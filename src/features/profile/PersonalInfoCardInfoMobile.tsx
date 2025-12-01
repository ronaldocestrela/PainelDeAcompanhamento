import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
  Stack,
  Avatar,
  InputAdornment,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

interface HeaderProfileProps {
  imageUrl?: string;
  name?: string;
  lastName?: string;
  roleName?: string;
  email?: string;
  editMode?: boolean;
  onFieldChange?: (field: string, value: string) => void;
}

export const PersonalInfoCardInfoMobile = ({
  imageUrl,
  name,
  lastName,
  roleName,
  email,
  editMode,
  onFieldChange,
}: HeaderProfileProps) => {
  return (
    <Stack direction="column" spacing={2} sx={{ my: 1 }}>
      <Stack direction="row" spacing={2}>
        <Box sx={{ position: "relative", width: 108, height: 108 }}>
          <Avatar
            src={imageUrl}
            alt="Profile"
            sx={{ width: 108, height: 108 }}
          />
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
          >
            <EditRoundedIcon />
          </IconButton>
        </Box>
        <Stack spacing={1} sx={{ flexGrow: 1 }}>
          <FormLabel>Nome</FormLabel>
          <Stack direction="column" spacing={2}>
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
              disabled={!editMode}
              onChange={(e) => onFieldChange?.("lastName", e.target.value)}
            />
          </Stack>
        </Stack>
      </Stack>
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
  );
};
