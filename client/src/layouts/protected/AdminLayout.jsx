import { Box, Stack } from '@mui/material'
import { useUserStore, useUIStore } from './../../store/useUserStore.js';
import { Outlet, redirect } from 'react-router';

import AdminSideMenu from './../../components/protected/admin/AdminSideMenu.jsx';
import AdminHeader from './../../components/protected/admin/AdminHeader.jsx';
import AdminNavbar from './../../components/protected/admin/AdminNavbar.jsx';

import DialogsProvider from './../../hooks/admin/useDialogs/DialogsProvider.jsx';

// export async function loader(isAuthed) {
//   if (!isAuthed) throw redirect('/user/login');
//   useUIStore.getState().setShowNavbar(false); // hide main navbar
//   useUIStore.getState().setDashboardSideMenuItem("Student"); // set default menu item button selection
//   return;
// }

export default function AdminLayout() {
  const user = useUserStore(state => state.user);

  return (
    <DialogsProvider>
      <Box sx={{ display: 'flex' }}>
        <AdminSideMenu user={user} />
        <AdminNavbar user={user} />

        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              ml: 2,
              mr: 2,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <AdminHeader />
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </DialogsProvider>
  );
}