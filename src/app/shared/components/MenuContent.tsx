import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Groups2Icon from "@mui/icons-material/Groups2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useNavigate, useLocation } from "react-router";
import { useAccount } from "../../../lib/hooks/useAccount";
import { useDashboard } from "./DashboardContext";

const mainListItems = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
  // { text: "Analistas", icon: <AnalyticsRoundedIcon />, link: "/analysts" },
  { text: "Experts", icon: <Groups2Icon />, link: "/experts" },
  // { text: "Vendedores", icon: <ContentPasteIcon />, link: "/sellers" },
  { text: "Campanhas", icon: <CampaignIcon />, link: "/campaings" },
  // { text: "Casas de apostas", icon: <AssuredWorkloadIcon />, link: "/bookmakers",},
  // { text: "Relatório de Leads", icon: <Groups2Icon />, link: "/leads" },
  // { text: "Produtos", icon: <ShoppingBasketIcon />, link: "/products" },
  // { text: "Vendas", icon: <AttachMoneyIcon />, link: "/sales" },
  // { text: "Ações Marketing", icon: <LocalGroceryStoreIcon />, link: "/marketing" },
  { text: "Acordos", icon: <HandshakeIcon />, link: "/deals" },
  // { text: "Ranking", icon: <FormatListBulletedIcon/>, link: "/ranking-externo", external: true },
  {
    text: "Empresas",
    icon: <CorporateFareIcon />,
    link: "/companies",
  },
  // { text: "Relatórios", icon: <AnalyticsRoundedIcon />, link: "/reports" },
];

const secondaryListItems = [
  // { text: "Settings", icon: <SettingsRoundedIcon /> },
  // { text: "About", icon: <InfoRoundedIcon /> },
  // { text: "Feedback", icon: <HelpRoundedIcon /> },
  { text: "Usuários", icon: <PeopleOutlinedIcon />, link: "/users" },
  { text: "Recacular", icon: <CalculateOutlinedIcon />, link: "/recalculate" },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAccount();
  const { sidebarOpen } = useDashboard();
  const collapsed = !sidebarOpen;

  const isAdmin = currentUser?.roleName?.toLowerCase() === "superadmin";

  const visibleMainListItems = isAdmin
    ? mainListItems
    : mainListItems.filter(
        (item) => item.text === "Dashboard" || item.text === "Leads",
      );

  const itemButtonSx = (active: boolean) => ({
    borderRadius: "8px",
    mb: 0.5,
    justifyContent: collapsed ? "center" : "initial",
    px: collapsed ? 1 : active ? "calc(12px - 3px)" : 1.5,
    py: 0.75,
    borderLeft: active ? "3px solid" : "3px solid transparent",
    borderColor: active ? "primary.main" : "transparent",
    backgroundColor: active ? "action.selected" : "transparent",
    "&:hover": {
      backgroundColor: "primary.main",
      "& .MuiListItemIcon-root": { color: "primary.contrastText" },
      "& .MuiListItemText-root span": { color: "primary.contrastText" },
    },
    "&.Mui-selected": {
      backgroundColor: "action.selected",
      "&:hover": { backgroundColor: "primary.main" },
    },
  });

  const renderItem = (item: (typeof mainListItems)[0], index: number) => {
    const active = location.pathname === item.link;

    const content = item.external ? (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <ListItemButton sx={itemButtonSx(false)}>
          <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: "inherit" }}>
            {item.icon}
          </ListItemIcon>
          {!collapsed && (
            <ListItemText
              primary={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: "0.875rem",
                  }}
                >
                  {item.text}
                  <OpenInNewIcon sx={{ fontSize: 14 }} />
                </span>
              }
            />
          )}
        </ListItemButton>
      </a>
    ) : (
      <ListItemButton
        selected={active}
        onClick={() => navigate(item.link)}
        sx={itemButtonSx(active)}
      >
        <ListItemIcon
          sx={{
            minWidth: collapsed ? 0 : 36,
            color: active ? "primary.main" : "inherit",
          }}
        >
          {item.icon}
        </ListItemIcon>
        {!collapsed && (
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontWeight: active ? 600 : 400,
              color: active ? "primary.main" : "text.primary",
              fontSize: "0.875rem",
            }}
          />
        )}
      </ListItemButton>
    );

    return (
      <ListItem key={index} disablePadding sx={{ display: "block" }}>
        {collapsed ? (
          <Tooltip title={item.text} placement="right" arrow>
            <span>{content}</span>
          </Tooltip>
        ) : (
          content
        )}
      </ListItem>
    );
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense disablePadding>
        {visibleMainListItems.map((item, index) => renderItem(item, index))}
      </List>
      {isAdmin && (
        <List
          dense
          disablePadding
          subheader={
            !collapsed ? (
              <ListSubheader
                sx={{
                  bgcolor: "transparent",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "text.disabled",
                  px: 1.5,
                  lineHeight: "32px",
                  mt: 1,
                }}
              >
                Administração
              </ListSubheader>
            ) : undefined
          }
        >
          {secondaryListItems.map((item, index) => renderItem(item, index))}
        </List>
      )}
    </Stack>
  );
}
