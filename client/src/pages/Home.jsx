import Container from './../components/Container.jsx'
import Card from './../components/Card.jsx'
import { Box, Typography, Avatar, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useUserStore } from './../store/useUserStore.js';
import { useRef, useState } from 'react';

const Home = () => {
    const user = useUserStore(state => state.user);
    const [isHovered, setIsHovered] = useState(false);
    const [preview, setPreview] = useState('');
    const inputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);
        formData.append('userId', user.id);


    }

    return (
        <Container>
            <Card>

                {/* <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Home page is here
                    </Typography> */}

                <Box
                    sx={{
                        display: 'inline-block',
                        position: 'relative',
                        flexDirection: 'column',
                        width: 150,
                        height: 150,
                        gap: 2,
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Avatar
                        sx={{
                            width: 150,
                            height: 150,
                            alignSelf: 'center',
                        }}
                        src={user.profilePicture || undefined}
                        alt={user.username}
                    />
                    {isHovered && (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                // left: 100,
                                right: 8,
                            }}
                        >
                            <IconButton aria-label="edit" size='small'
                                sx={{
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                                }}
                                onClick={() => inputRef.current.click()}
                            >
                                <EditIcon />
                            </IconButton>
                        </Box>
                    )}
                    <input
                        type='file'
                        ref={inputRef}
                        accept='image/*'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </Box>
            </Card>
        </Container>
    )
}

export default Home