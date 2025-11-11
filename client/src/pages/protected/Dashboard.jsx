import { Box, Container, Stack } from '@mui/material'

import { useUserStore, useUIStore } from './../../store/useUserStore.js';
import { redirect, useLoaderData } from 'react-router';
import { authAPI } from './../../api/axiosInstance.js';
import AppNavbar from './../../components/protected/AppNavbar';
import SideMenu from './../../components/protected/SideMenu';
import Header from './../../components/protected/Header';



// authorize user and redirect to dashboard page
export async function loader() {
    const { accessToken } = useUserStore.getState();

    if (!accessToken) throw redirect('/login');
    try {
        const { data } = await authAPI.get(
            '/auth/user',
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        useUserStore.getState().setUser(data.user); // update user
        useUIStore.getState().setShowNavbar(false); // hide navbar
        return { user: data.user };
    } catch (error) {
        throw redirect('/login');
    }
}

export function Dashboard() {
    const { user } = useLoaderData();

    return (
        <Box sx={{ display: 'flex' }}>
            <SideMenu />
            <AppNavbar />

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
                        alignItems: 'center',
                        mx: 3,
                        pb: 5,
                        mt: { xs: 8, md: 0 },
                    }}
                >
                    <Header />
                    {/* <MainGrid /> */}
                </Stack>
            </Box>
        </Box>
    );

}

