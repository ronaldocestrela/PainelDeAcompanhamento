import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import { Box, CircularProgress } from "@mui/material";

export default function RequireAuth() {
  const { currentUser, loadinUserInfo } = useAccount();
  const location = useLocation();

  if (loadinUserInfo)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!currentUser) return <Navigate to="/signin" state={{ from: location }} />;

  return <Outlet />;
}
