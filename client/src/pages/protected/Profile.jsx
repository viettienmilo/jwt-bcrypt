import Container from './../../components/Container.jsx';
import { Box, Typography } from '@mui/material';


const Profile = () => {
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    mt: 10,
                    justifyContent: 'center'
                }}>
                <Typography variant='h4'>
                    Profile Page
                </Typography>
            </Box>

        </Container>
    )
}

export default Profile