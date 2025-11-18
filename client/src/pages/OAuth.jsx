import { Box, Typography } from "@mui/material";
import Container from './../components/Container.jsx';
import Card from './../components/Card.jsx';
import useCreateProfile from './../hooks/user/useCreateProfile.js';
import { useUserStore } from './../store/useUserStore.js';
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";


const OAuth = () => {

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const userId = params.get('userId');
    const username = params.get('username');
    const firstname = params.get('firstname');
    const lastname = params.get('lastname');
    const avatarUrl = params.get('avatarUrl');

    const { mutate } = useCreateProfile();
    const setUser = useUserStore(state => state.setUser);
    const [profileCreated, setProfileCreated] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (!userId || profileCreated) return;
        mutate({ userId, username, firstname, lastname, avatarUrl }, {
            onSuccess: (data) => {
                setUser(data.user);
                setProfileCreated(true);
                navigate('/');
            },
            onError: (error) => {
                console.log(error);
                navigate('/user/login');
            }
        })
    }, [userId, profileCreated])

    return (
        <Container direction="column" justifyContent="space-between">
            <Card variant="outlined">
                {!userId ?
                    <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h3" color="secondary">Account is invalid</Typography>
                    </Box>
                    :
                    <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h4" color="secondary">Sign in successfully. Redirecting…</Typography>
                    </Box>
                }
            </Card>
        </Container >
    )
}

export default OAuth