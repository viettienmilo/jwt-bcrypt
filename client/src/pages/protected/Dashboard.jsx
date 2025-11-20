import { Box, Stack } from '@mui/material'
import { useUserStore, useUIStore } from './../../store/useUserStore.js';
import { Outlet, redirect } from 'react-router';
import AppNavbar from './../../components/protected/AppNavbar';
import SideMenu from './../../components/protected/SideMenu';
import Header from './../../components/protected/Header';

// authorize user and redirect to dashboard page
export async function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setShowNavbar(false); // hide main navbar
    useUIStore.getState().setDashboardSideMenuItem("Overview"); // set default menu item button selection
    return;
}

export function Dashboard() {
    const user = useUserStore(state => state.user);

    return (
        <Box sx={{ display: 'flex' }}>
            <SideMenu user={user} />
            <AppNavbar user={user} />

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
                        // alignItems: 'center',
                        ml: 6,
                        mr: 1,
                        pb: 5,
                        mt: { xs: 8, md: 0 },
                    }}
                >
                    <Header />
                    {/* <MainGrid /> */}
                    <Outlet />
                </Stack>
            </Box>
        </Box>
    );
}