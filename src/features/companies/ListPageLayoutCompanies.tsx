import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface ListPageLayoutCompaniesProps {
  title: string;
  children: ReactNode;
  actionButton?: ReactNode;
}

export default function ListPageLayoutCompanies({
  title,
  children,
  actionButton,
}: ListPageLayoutCompaniesProps) {
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {actionButton}
      </Stack>
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Box>
  );
}
