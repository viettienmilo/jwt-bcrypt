import { Box, Stack } from '@mui/material'
import { useUserStore, useUIStore } from './../../store/useUserStore.js';
import { redirect, useLoaderData, } from 'react-router';
import { authAPI } from './../../api/axiosInstance.js';
import AppNavbar from './../../components/protected/AppNavbar';
import SideMenu from './../../components/protected/SideMenu';
import Header from './../../components/protected/Header';

// authorize user and redirect to dashboard page
export async function loader() {
    const { accessToken } = useUserStore.getState();

    if (!accessToken) throw redirect('/user/login');
    try {
        const { data } = await authAPI.get(
            '/auth/user',
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        useUserStore.getState().setUser(data.data.user); // update user
        useUIStore.getState().setShowNavbar(false); // hide navbar
        return { user: data.data.user };

    } catch (error) {
        throw redirect('/user/login');
    }
}

export async function oauthLoader({ request }) {
    const url = new URL(request.url);
    const accessToken = url.searchParams.get('accessToken');
    if (!accessToken) throw redirect('/user/login');
    useUserStore.getState().setAccessToken(accessToken);

    try {
        const { data } = await authAPI.get(
            '/auth/user',
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        useUserStore.getState().setUser(data.user); // update user
        useUIStore.getState().setShowNavbar(false); // hide navbar
        return { user: data.user };

    } catch (error) {
        throw redirect('/user/login');
    }
}

export function Dashboard() {
    const { user } = useLoaderData();

    return (
        <Box sx={{ display: 'flex' }}>
            <SideMenu user={user} />
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
                        ml: 6,
                        mr: 1,
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

