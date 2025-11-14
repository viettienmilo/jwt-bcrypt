import { Box, Typography } from '@mui/material';
import Container from './../components/Container.jsx';
import { redirect } from 'react-router'

export async function loader(isAuthed) {
    return (!isAuthed ? redirect('/user/login') : null);
}

const Home = () => {

    return (
        <Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <Typography variant="h2" textAlign="center">
                    Home page
                </Typography>
            </Box>
        </Container>
    )
}

export default Home