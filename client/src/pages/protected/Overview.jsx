import { Box, Typography } from '@mui/material';
import { useUserStore, useUIStore } from './../../store/useUserStore.js';
import { redirect } from 'react-router';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Overview');
    return null;
}

const Overview = () => {
    const user = useUserStore(state => state.user);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <Typography variant="h2" textAlign="center">
                Overview
            </Typography>
        </Box>
    )
}

export default Overview