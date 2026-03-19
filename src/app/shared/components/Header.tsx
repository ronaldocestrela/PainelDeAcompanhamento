import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import { useDashboard } from "./DashboardContext";

export default function Header() {
  const { sidebarOpen, toggleSidebar } = useDashboard();

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: "100%",
        pt: 1.5,
      }}
      spacing={2}
    >
      <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={toggleSidebar}
          size="small"
          aria-label={
            sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"
          }
          sx={{ color: "text.secondary" }}
        >
          <ViewSidebarOutlinedIcon />
        </IconButton>
        <NavbarBreadcrumbs />
      </Stack>
      <Stack direction="row" sx={{ gap: 1 }}>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
