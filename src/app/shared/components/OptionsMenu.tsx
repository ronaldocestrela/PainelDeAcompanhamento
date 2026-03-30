import { styled } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { listClasses } from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import MenuButton from "./MenuButton";
import { useState } from "react";
import { useAccount } from "../../../lib/hooks/useAccount";
import { useNavigate } from "react-router";
import { Avatar, Box, Typography } from "@mui/material";

const MenuItem = styled(MuiMenuItem)({
  margin: "1px 0",
  paddingTop: 4,
  paddingBottom: 4,
  minHeight: "unset",
});

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const { logoutUser, currentUser } = useAccount();

  return (
    <>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: "transparent" }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: "2px",
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
            minWidth: 175,
          },
          [`& .${dividerClasses.root}`]: {
            margin: "2px -2px",
          },
        }}
      >
        <Box
          sx={{ px: 1.5, py: 1, display: "flex", alignItems: "center", gap: 1 }}
        >
          <Avatar
            src={currentUser?.imageUrl}
            alt={currentUser?.name}
            sx={{ width: 28, height: 28, fontSize: 12 }}
          />
          <Box>
            <Typography variant="caption" fontWeight={600} lineHeight={1.3}>
              {currentUser?.name} {currentUser?.lastName}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.65rem", display: "block" }}
            >
              {currentUser?.email}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/myprofile");
          }}
        >
          <ListItemIcon>
            <PersonRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Perfil</ListItemText>
        </MenuItem>

        {currentUser?.roleName?.toLowerCase() === "admin" && (
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/users");
            }}
          >
            <ListItemIcon>
              <PeopleRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Usuários</ListItemText>
          </MenuItem>
        )}

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Configurações</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            logoutUser.mutate();
            handleClose();
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
