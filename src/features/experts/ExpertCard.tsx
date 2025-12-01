import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { ExpertList } from "../../lib/types";

interface ExpertCardProps {
  expert: ExpertList;
  onEdit: (expert: ExpertList) => void;
}

export default function ExpertCard({ expert, onEdit }: ExpertCardProps) {
  return (
    <Card variant="outlined" sx={{ width: 280, m: 2, position: "relative" }}>
      <IconButton
        aria-label="editar expert"
        onClick={() => onEdit(expert)}
        size="small"
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 4,
        }}
      >
        <Avatar
          src={expert.photoUrl}
          alt={expert.name}
          sx={{ width: 72, height: 72, mb: 2 }}
        />
        <Typography variant="h6" component="div" align="center">
          {expert.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
