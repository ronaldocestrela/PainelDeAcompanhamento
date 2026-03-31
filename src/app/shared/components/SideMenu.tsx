import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import UserMenu from "../../layout/UserMenu";
import { useDashboard } from "./DashboardContext";

const drawerWidth = 240;
const collapsedWidth = 64;

export default function SideMenu() {
  const { sidebarOpen } = useDashboard();

  return (
    <MuiDrawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        width: sidebarOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        transition: "width 0.25s ease-in-out",
        [`& .${drawerClasses.paper}`]: {
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
          overflowX: "hidden",
          transition: "width 0.25s ease-in-out",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 64,
          px: 1.5,
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          overflow: "hidden",
        }}
      >
        <img
          src="/public/logoBetBoard.png"
          alt="Logo"
          style={{
            height: sidebarOpen ? "auto" : 36,
            width: sidebarOpen ? "100%" : 36,
            objectFit: "contain",
            transition: "all 0.25s ease-in-out",
          }}
        />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: sidebarOpen ? 2 : 1,
          gap: 1,
          alignItems: "center",
          justifyContent: sidebarOpen ? "flex-start" : "center",
          borderTop: "1px solid",
          borderColor: "divider",
          transition: "padding 0.25s ease-in-out",
        }}
      >
        {sidebarOpen && <UserMenu />}
        <OptionsMenu />
      </Stack>
    </MuiDrawer>
  );
}
