import { drawerClasses } from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { StyledDrawer } from './../StyledComponents.jsx';
import { Box, Divider, Stack, Typography } from '@mui/material';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { deepPurple } from '@mui/material/colors';



export default function SideMenu({ user }) {

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
        <OptionsMenu />
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
        <MenuContent />
      </Box>
    </StyledDrawer>
  );
}
