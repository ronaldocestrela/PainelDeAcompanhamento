import { Box, Typography, Stack } from "@mui/material";
import type { ReactNode } from "react";

interface ListPageLayoutCampaingsProps {
  title: string;
  children: ReactNode;
  actionButton?: ReactNode;
}

export default function ListPageLayoutCampaings({
  title,
  children,
  actionButton,
}: ListPageLayoutCampaingsProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" component="h1" fontWeight={600}>
          {title}
        </Typography>
        {actionButton && <Box>{actionButton}</Box>}
      </Stack>
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Box>
  );
}
