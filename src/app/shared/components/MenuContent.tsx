import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import Groups2Icon from "@mui/icons-material/Groups2";
import CampaignIcon from "@mui/icons-material/Campaign";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useNavigate, useLocation } from "react-router";
import { useAccount } from "../../../lib/hooks/useAccount";

const mainListItems = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
  // { text: "Analistas", icon: <AnalyticsRoundedIcon />, link: "/analysts" },
  { text: "Experts", icon: <ContentPasteIcon />, link: "/experts" },
  // { text: "Vendedores", icon: <ContentPasteIcon />, link: "/sellers" },
  { text: "Campanhas", icon: <CampaignIcon />, link: "/campaings" },
  // { text: "Casas de apostas", icon: <AssuredWorkloadIcon />, link: "/bookmakers",},
  // { text: "Relatório de Leads", icon: <Groups2Icon />, link: "/leads" },
  // { text: "Produtos", icon: <ShoppingBasketIcon />, link: "/products" },
  // { text: "Vendas", icon: <AttachMoneyIcon />, link: "/sales" },
  // { text: "Ações Marketing", icon: <LocalGroceryStoreIcon />, link: "/marketing" },
  { text: "Acordos", icon: <HandshakeIcon />, link: "/deals" },
  // { text: "Ranking", icon: <FormatListBulletedIcon/>, link: "/ranking-externo", external: true },
  { text: "Empresas", icon: <BusinessCenterOutlinedIcon />, link: "/companies" },
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

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isAdmin = currentUser?.roleName?.toLowerCase() === "superadmin";

  const visibleMainListItems = isAdmin
    ? mainListItems
    : mainListItems.filter(
        (item) => item.text === "Dashboard" || item.text === "Leads"
      );

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {visibleMainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            {item.external ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {item.text}
                        {item.external && <OpenInNewIcon sx={{ fontSize: 16, ml: 12 }} />}
                      </span>
                    }
                  />
                </ListItemButton>
              </a>
            ) : (
              <ListItemButton
                selected={location.pathname === item.link}
                onClick={() => handleNavigate(item.link)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      {isAdmin && (
        <List dense>
          {secondaryListItems.map((item, index) => (
            <a href={item.link} style={{ textDecoration: "none", color: "inherit" }} key={index}>
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
            </a>
          ))}
        </List>
      )}
    </Stack>
  );
}
