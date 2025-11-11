import { Link as RouterLink, useRouteError } from 'react-router';
import { Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import pageError from './../assets/page-error.png'
import Container from './Container.jsx';

export default function PageError() {
    const theme = useTheme();
    const error = useRouteError();

    return (
        <Container>
            <Box
                component="img"
                src={pageError}
                alt="page-error-img"
                sx={{
                    display: "block",
                    mx: "auto",
                    mt: 25,
                    mb: 10,
                    maxWidth: "100%",
                    height: "auto",
                }}
            />
            <Box
                sx={{
                    maxWidth: "50%",
                    mx: "auto"
                }}>
                <Typography variant="h6"
                    sx={{
                        my: 5,
                        letterSpacing: 4,
                        fontWeight: 500,
                        textAlign: "center",
                        color: theme.palette.error.light
                    }}>
                    {error.message.toUpperCase()}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center", // center horizontally
                    mt: 4,
                }}
            >
                <Button
                    component={RouterLink}
                    to="/"
                    variant="contained"
                >
                    BACK TO HOME
                </Button>
            </Box>
        </Container>
    );
}