import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface DealsHeaderProps {
  onCreateDeal: () => void;
  isCreating: boolean;
}

export default function DealsHeader({ onCreateDeal, isCreating }: DealsHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography variant="h4" component="h1">
        Acordos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onCreateDeal}
        disabled={isCreating}
        sx={{
          minWidth: { xs: "auto", sm: "150px" },
          px: { xs: 1, sm: 2 },
        }}
      >
        {isCreating ? "Criando..." : "Novo Acordo"}
      </Button>
    </Box>
  );
}