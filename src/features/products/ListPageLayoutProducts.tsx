import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface ListPageLayoutProductsProps {
  title: string;
  children: ReactNode;
  actionButton?: ReactNode;
}

export default function ListPageLayoutProducts({
  title,
  children,
  actionButton,
}: ListPageLayoutProductsProps) {
  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        margin: { xs: "1rem", md: "2rem auto" },
        width: {
          xs: "400px",
          sm: "700px",
          md: "900px",
          lg: "1000px",
          xl: "150%",
        },
        maxWidth: "1400px",
        boxSizing: "border-box",
      }}
      elevation={2}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            width: "100%",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        {actionButton && (
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {actionButton}
          </Box>
        )}
      </Box>
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Paper>
  );
}
