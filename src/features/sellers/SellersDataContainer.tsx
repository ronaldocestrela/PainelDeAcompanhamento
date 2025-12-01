import { Box, CircularProgress, Typography } from "@mui/material";
import SellersTable from "./SellersTable";
import { useSellers } from "../../lib/hooks/useSellers";

export default function SellersDataContainer() {
  const { sellers, isLoading, error } = useSellers();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Erro ao carregar os sellers
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <SellersTable sellers={sellers} />
    </Box>
  );
}
