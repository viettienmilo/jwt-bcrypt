import { Box, Typography } from '@mui/material';
import { redirect } from 'react-router';
import { useUserStore, useUIStore } from '../../../store/useUserStore.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Settings');
    return null;
}

const Settings = () => {
    const user = useUserStore(state => state.user);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <Typography variant="h2" textAlign="center">
                Settings
            </Typography>
        </Box>
    )
}

export { Settings }