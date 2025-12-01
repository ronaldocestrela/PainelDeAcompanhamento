import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        bgcolor: "#05070a",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: "4rem", md: "6rem", color: "white" } }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ color: "white" }} gutterBottom>
        Página não encontrada
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 400, mb: 3, color: "white" }}>
        A página que você está tentando acessar não existe ou foi removida.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")} size="large">
        Voltar para a Home
      </Button>
    </Box>
  );
}
