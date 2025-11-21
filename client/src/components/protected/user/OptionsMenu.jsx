import Divider, { dividerClasses } from '@mui/material/Divider';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import { Typography, Menu, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { styled } from '@mui/material/styles';

import { useState } from 'react';
import { useNavigate } from 'react-router';

import MenuButton from './MenuButton';
import { useUserStore } from '../../../store/useUserStore.js';
import { logoutService } from '../../../services/authServices.js';


const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
});

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const logout = useUserStore(state => state.logout);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutService();
    logout();
    handleClose();
    navigate('/user/login');
  }
  return (
    <>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: 'transparent', width: 32, height: 32 }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: '4px',
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: '2px -4px',
          },
        }}
      >

        <MenuItem onClick={() => navigate('/')} sx={{ gap: 1 }}>
          <HomeIcon fontSize='small' />
          <Typography fontSize='small'>
            Home page
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: 'auto',
              minWidth: 0,
            },
            gap: 1
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ fontSize: 'small' }} disableTypography>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
