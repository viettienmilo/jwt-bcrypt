import { Box, Typography } from '@mui/material';
import Container from '../components/Container.jsx';
import { useForm } from 'react-hook-form'

export default function Home() {
    useForm();

    return (
        <Container direction="column" justifyContent="space-between">
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
    );
}

