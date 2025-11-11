import { Link as RouterLink } from 'react-router';
import { Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dark404 from './../assets/dark-404.png'
import Container from './Container.jsx';

export default function Page404() {
    const theme = useTheme();
    return (
        <Container>
            <Box
                component="img"
                src={dark404}
                alt="img404"
                sx={{
                    display: "block",
                    mx: "auto",
                    mt: 30,
                    mb: 10,
                    maxWidth: "100%",
                    height: "auto",
                }}
            >
                <Typography variant="h6"
                    sx={{
                        letterSpacing: 4,
                        fontWeight: 500,
                        textAlign: "center",
                        color: theme.palette.error.light
                    }}>
                    OOPS! PAGE NOT FOUND
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
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