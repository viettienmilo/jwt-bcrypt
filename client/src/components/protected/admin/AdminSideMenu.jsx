import { drawerClasses } from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { Box, Divider, Stack, Typography, IconButton, Icon } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';

import { StyledDrawer } from './../../StyledComponents.jsx';
import AdminMenuContent from './AdminMenuContent.jsx';
import { logoutService } from './../../../services/authServices.js';
import { useUserStore } from '../../../store/useUserStore.js';
import { useNavigate } from 'react-router';

export default function AdminSideMenu({ user }) {
  const logout = useUserStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutService();
    logout();
    navigate('/user/login');
  }

  return (
    <StyledDrawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper', width: 'auto', minWidth: 250
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          variant="rounded"
          alt={user?.username || "username"}
          src={user?.avatarUrl || undefined}
          sx={{ width: 28, height: 28, bgcolor: deepPurple[500] }}
        >
          {user?.username?.[0]?.toUpperCase() || "X"}
        </Avatar>
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {user?.username}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {user?.email}
          </Typography>
        </Box>
        <IconButton size='small' onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>

      </Stack>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AdminMenuContent />
      </Box>
    </StyledDrawer>
  );
}
