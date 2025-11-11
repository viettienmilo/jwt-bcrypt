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
import StyledToolbar from './StyledToolbar';
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
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">Features</Button>
              <Button variant="text" color="info" size="small">Testimonials</Button>
              <Button variant="text" color="info" size="small">Highlights</Button>
              <Button variant="text" color="info" size="small">Pricing</Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>FAQ</Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>Blog</Button>
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
              onClick={() => navigate('/register')}>
              Register
            </Button>}
            {!user && <Button color="primary" variant="contained" size="small"
              onClick={() => navigate('/login')}>
              Log in
            </Button>}
            {/* {user && <Button color="primary" variant="contained" size="small" >
              Log out
            </Button>} */}
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
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Register
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Log in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container >
    </AppBar >
  );
}
