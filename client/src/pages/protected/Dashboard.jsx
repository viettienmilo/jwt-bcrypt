import Container from './../../components/Container';
import Card from './../../components/Card';
import { Box, Typography } from '@mui/material'

import { useUserStore } from './../../store/useUserStore.js';
import { redirect, useLoaderData } from 'react-router';
import { authAPI } from './../../api/axiosInstance.js';

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
        return data.user;
    } catch (error) {
        throw redirect('/login');
    }
}

export function Dashboard() {
    const user = useLoaderData();

    return (
        <Container>
            <Card>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(1.5rem, 10vw, 1.75rem)' }}
                    >
                        Dashboard is here {user.userId}
                    </Typography>
                </Box>
            </Card>
        </Container>
    )
}