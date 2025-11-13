import Container from './../../components/Container.jsx';
import { Box, Typography } from '@mui/material';
import { redirect } from 'react-router';

export async function loader(isAuthed) {
    return (!isAuthed ? redirect('user/login') : null);
}

const Profile = () => {
    return (
        <Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <Typography variant="h2" textAlign="center">
                    Profile Page
                </Typography>
            </Box>
        </Container>
    )
}

export default Profile