import { useNavigate } from "react-router";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import useActivateUser from './../api/useActivateUser.js';
import { useSnackbar } from 'notistack';
import { Box, Typography } from "@mui/material";
import Container from './../components/Container.jsx';

export default function Activate() {

    const navigate = useNavigate();
    const token = new URLSearchParams(window.location.search).get("token");

    const { mutate } = useActivateUser();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!token) {
            return;
        }
        mutate({ token }, {
            onSuccess: (data) => {
                enqueueSnackbar(data.message || "User activation is successful. Please log in to start.", { variant: 'success' });
                navigate('/user/login');
            },
            onError: (error) => {
                enqueueSnackbar(error.response?.data?.message || "User activation failed", { variant: 'error' });
                navigate('/user/register');
            }
        })
    }, [token]);


    return (
        <Container>
            {token ?
                <Box sx={{ height: '100vh', display: 'flex', flexDirection: "column", gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3">Activating your account…</Typography>
                    <CircularProgress />
                </Box>
                :
                <Box sx={{ height: '100vh', display: 'flex', flexDirection: "column", gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3">No activation token provided.</Typography>
                    <Typography variant="p">Please check your email for the correct activation link.</Typography>
                </Box>
            }
        </Container>
    )
}
