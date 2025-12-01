import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import { Typography } from "@mui/material";

export default function RequireAuth() {
    const { currentUser, loadinUserInfo } = useAccount();
    const location = useLocation();

    if (loadinUserInfo) return <Typography>Loading...</Typography>

    if (!currentUser) return <Navigate to="/signin" state={{from: location}} />

    return (
        <Outlet />
    )
}
