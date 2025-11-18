import Container from './../../components/Container.jsx';
import { Box, Typography } from '@mui/material';
import { redirect } from 'react-router';
import EditableAvatar from './../../components/protected/EditableAvatar.jsx';
import { useUserStore } from './../../store/useUserStore.js';

export async function loader(isAuthed) {
    return (!isAuthed ? redirect('user/login') : null);
}

const Profile = () => {
    const user = useUserStore(state => state.user);

    return (
        <Container>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <Typography variant="h2" textAlign="center">
                    {user?.username}
                </Typography>
                {user && <EditableAvatar user={user} />}
            </Box>
        </Container>
    )
}

export default Profile