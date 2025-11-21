import { Box, Typography } from "@mui/material";
import Container from './../components/Container.jsx';
import Card from './../components/Card.jsx';
import { useUserStore } from './../store/useUserStore.js';
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useFetchUserProfile from './../hooks/user/useFetchUserProfile.js';
import { useSnackbar } from "notistack";


const OAuth = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const setAccessToken = useUserStore(state => state.setAccessToken);
    const setUser = useUserStore(state => state.setUser);
    const setRole = useUserStore(state => state.setRole)

    const { data: userProfile, refetch: fetchUserProfile } = useFetchUserProfile(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const accessToken = params.get('accessToken');
        if (!accessToken) {
            navigate("/user/login");
            return;
        }

        // save accessToken
        setAccessToken(accessToken);

        // fetch and save user profile, email and role
        fetchUserProfile()
            .then(({ data }) => {
                const fetchedUser = data.data.user;
                setUser(fetchedUser);
                setRole(fetchedUser.role);
                enqueueSnackbar("User logged in successfully", { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                console.log("Failed to fetch profile:", error);
                enqueueSnackbar("Failed to load user profile", { variant: "error" });
            });
    }, [])

    return (
        <Container direction="column" justifyContent="space-between">
            <Card variant="outlined">

                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h4" color="secondary">Sign in successfully. Redirecting…</Typography>
                </Box>

            </Card>
        </Container >
    )
}

export default OAuth
