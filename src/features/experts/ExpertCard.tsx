import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { ExpertList } from "../../lib/types";

interface ExpertCardProps {
  expert: ExpertList;
  onEdit: (expert: ExpertList) => void;
}

export default function ExpertCard({ expert, onEdit }: ExpertCardProps) {
  const createdDate = new Date(expert.createdAt).toLocaleDateString("pt-BR");

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        transition: "border-color 0.2s, box-shadow 0.2s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 1,
        },
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            src={expert.photoUrl}
            alt={expert.name}
            sx={{ width: 48, height: 48 }}
          />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {expert.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Criado em {createdDate}
            </Typography>
          </Box>
          <IconButton
            aria-label="editar expert"
            onClick={() => onEdit(expert)}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
