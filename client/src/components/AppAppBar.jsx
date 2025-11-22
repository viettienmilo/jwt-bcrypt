import { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import {
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from './../shared-theme/ColorModeIconDropdown.jsx';
import Sitemark from './SitemarkIcon';
import { StyledToolbar } from './StyledComponents.jsx';
import UserMenu from './UserMenu';

import { useNavigate } from 'react-router';
import { useUserStore } from './../store/useUserStore.js';

export default function AppAppBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useUserStore(state => state.user)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar variant="dense" disableGutters>
          <Sitemark />
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button variant="text" color="info" sx={{ flex: 1 }}>About</Button>
              <Button variant="text" color="info" sx={{ flex: 1 }}>Features</Button>
              <Button variant="text" color="info" sx={{ flex: 1 }}>Blog</Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {!user && <Button color="primary" variant="text" size="small"
              onClick={() => navigate('user/register')}>
              Register
            </Button>}
            {!user && <Button color="primary" variant="contained" size="small"
              onClick={() => navigate('user/login')}>
              Log in
            </Button>}
            {user && <UserMenu />}
            <ColorModeIconDropdown />
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              slotProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)} sx={{ width: 24, height: 24 }}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  {user && <UserMenu />}
                  <Divider sx={{ my: 2, width: '100%' }} />
                  <MenuItem sx={{ minHeight: 'auto' }}>About</MenuItem>
                  <MenuItem sx={{ minHeight: 'auto' }}>Features</MenuItem>
                  <MenuItem sx={{ minHeight: 'auto' }}>Blog</MenuItem>
                  {!user && <MenuItem>
                    <Divider sx={{ my: 3 }} />
                    <Button color="primary" variant="contained" fullWidth
                      onClick={() => navigate('user/register')}>
                      Register
                    </Button>
                  </MenuItem>}
                  {!user && <MenuItem>
                    <Button color="primary" variant="outlined" fullWidth
                      onClick={() => navigate('user/login')}>
                      Log in
                    </Button>
                  </MenuItem>}
                </Box>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container >
    </AppBar >
  );
}
