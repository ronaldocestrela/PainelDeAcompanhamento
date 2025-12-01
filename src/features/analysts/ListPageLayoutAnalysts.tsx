import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface ListPageLayoutAnalystsProps {
  title: string;
  children: ReactNode;
  actionButton?: ReactNode;
}

export default function ListPageLayoutAnalysts({
  title,
  children,
  actionButton,
}: ListPageLayoutAnalystsProps) {
  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        margin: { xs: "1rem", md: "2rem auto" },
        width: {
          xs: "450px",
          sm: "96%",
          md: "700px",
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
