import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import UserMenu from "../../layout/UserMenu";
import { ImageListItem } from "@mui/material";
import { useDashboard } from "./DashboardContext";

const drawerWidth = 240;

export default function SideMenu() {
  const { sidebarOpen } = useDashboard();

  return (
    <MuiDrawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        width: sidebarOpen ? drawerWidth : 0,
        flexShrink: 0,
        transition: "width 0.25s ease-in-out",
        [`& .${drawerClasses.paper}`]: {
          width: sidebarOpen ? drawerWidth : 0,
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
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <ImageListItem>
          <img
            src="/public/logoBetBoard.png"
            alt="Logo"
            style={{ width: "100%", height: "auto" }}
          />
        </ImageListItem>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        {/* <SelectContent /> */}
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
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <UserMenu />
        <OptionsMenu />
      </Stack>
    </MuiDrawer>
  );
}
