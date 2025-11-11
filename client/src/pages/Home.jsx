import Container from './../components/Container.jsx'
import Card from './../components/Card.jsx'
import { Box, Typography } from '@mui/material'

const Home = () => {
    return (
        <Container>
            <Card>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Home page is here
                    </Typography>
                </Box>
            </Card>
        </Container>

    )
}

export default Home