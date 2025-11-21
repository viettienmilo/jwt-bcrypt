import { Box, Button, Typography } from '@mui/material';
import Container from '../components/Container.jsx';
import { useForm } from 'react-hook-form'
import MainImage from './../assets/mainpage_img_small.png';

export default function Home() {
    useForm();

    return (
        <Container >
            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                justifyContent={{ xs: 'flex-start', md: 'space-between' }}
                alignItems={{ xs: 'center', md: 'center' }}
                gap={2}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    mt={{ xs: 12 }}
                >
                    <Typography variant="h1">
                        Learn Something New
                    </Typography>
                    <Typography variant="h1">
                        Everyday.
                    </Typography>
                    <Typography variant="body1" mt={2}>
                        Online platform to learn something new everyday with your friends
                    </Typography>
                    <Typography variant="body1">
                        in best environment
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mt: 10,
                        gap: 2,
                    }}>
                        <Button
                            variant='contained'
                            color='info'
                            sx={{
                                color: 'white',
                                fontWeight: '200',
                                width: 160,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 20, // sharp corner
                            }}
                        >
                            Start Now
                        </Button>
                        <Button
                            variant='contained'
                            color='success'
                            sx={{
                                color: 'white',
                                fontWeight: '200',
                                width: 160,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 0, // sharp corner
                            }}
                        >
                            Registration
                        </Button>
                    </Box>
                </Box>
                <Box
                    component='img'
                    src={MainImage}
                    sx={{
                        width: { sm: '100%', md: '453px' },
                        height: '854px'
                    }}
                    mt={{ xs: 4, md: 10 }}
                    mb={{ xs: 2 }}
                />
            </Box>
        </Container>
    );
}

