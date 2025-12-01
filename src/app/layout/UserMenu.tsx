import { Avatar, Box, Typography } from '@mui/material';
import { useAccount } from '../../lib/hooks/useAccount';
import { useState, type MouseEvent } from 'react';

export default function UserMenu() {
  const { currentUser } = useAccount();
  const [anchorEl, SetAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    SetAnchorEl(null);
  };

  return (
    <>
      {/* <Button
        onClick={handleClick}
        color="inherit"
        size="large"
        sx={{ fontSize: '1.1rem' }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar />
          {currentUser?.displayName}
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component={Link} to="/createActivity" onClick={handleClose}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>Criar atividade</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>Meu perfil</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          logoutUser.mutate();
          handleClose();
        }}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </MenuItem>
      </Menu> */}
      <Avatar
        sizes="small"
        alt={currentUser?.name || 'Sem Nome'}
        src={currentUser?.imageUrl }
        sx={{ width: 36, height: 36 }}
      />
      <Box sx={{ mr: 'auto' }}>
        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
          {currentUser?.name || 'Sem Nome'} {currentUser?.lastName || ''}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {currentUser?.email || 'Sem Email'}
        </Typography>
      </Box>
      {/* <OptionsMenu /> */}
    </>
  )
}