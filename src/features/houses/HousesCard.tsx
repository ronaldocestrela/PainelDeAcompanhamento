import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import type { ListBookmakers } from "../../lib/types";

export interface HousesCardProps {
  house: ListBookmakers;
  onEdit?: () => void;
  onUploadLogo?: (file: File) => void;
}

export default function HousesCard({
  house,
  onEdit,
  onUploadLogo,
}: HousesCardProps) {
  return (
    <Card
      sx={{
        width: 326,
        height: 106.8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 2,
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Avatar
          src={house.logoUrl || undefined}
          alt={house.name || "Logo"}
          sx={{ width: 56, height: 56, mr: 2 }}
          variant="rounded"
        >
          {!house.logoUrl && house.name ? house.name[0].toUpperCase() : null}
        </Avatar>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
            {house.name}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 0.3 }}>
            <IconButton
              aria-label={`Editar ${house.name}`}
              color="primary"
              size="small"
              onClick={onEdit}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label={`Upload logo para ${house.name}`}
              color="secondary"
              size="small"
              component="label"
            >
              <FileUploadIcon fontSize="small" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && onUploadLogo) {
                    onUploadLogo(file);
                  }
                  e.target.value = "";
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
