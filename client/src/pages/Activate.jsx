import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Container from './../components/Container.jsx';
import Card from './../components/Card.jsx';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';

import { useSnackbar } from 'notistack';
import { useUserStore } from "../store/useUserStore.js";
import useSendActivationLink from './../hooks/auth/useSendActivationLink.js';
import useActivateUser from './../hooks/auth/useActivateUser.js';

export default function Activate() {

    const navigate = useNavigate();
    const token = new URLSearchParams(window.location.search).get("token");
    const email = new URLSearchParams(window.location.search).get("email");
    const expired = new URLSearchParams(window.location.search).get("expired");
    const [error, setError] = useState(false);

    const { mutate: activateUserMutate } = useActivateUser();
    const { mutate: sendActivationLinkMutate, isPending } = useSendActivationLink();

    const { enqueueSnackbar } = useSnackbar();
    const user = useUserStore(state => state.user);

    const handleSubmit = () => {
        if (!email) {
            enqueueSnackbar("Email is invalid", { variant: 'error' });
            setError(true);
            return;
        }

        sendActivationLinkMutate({ email }, {
            onSuccess: () => {
                enqueueSnackbar("Activation Link has been sent. Please check your mailbox.", { variant: 'success' });
            },
            onError: (error) => {
                setError(true);
                const errorCode = error.response?.data?.error;
                switch (errorCode) {
                    case "INVALID_CREDENTIALS":
                        return enqueueSnackbar("Email is invalid", { variant: 'error' });
                    default:
                        return enqueueSnackbar("Undefined error occurs. Please register account again.", { variant: 'error' });
                }
            }
        });
    }

    useEffect(() => {
        if (token) {
            activateUserMutate({ token }, {
                onSuccess: () => {
                    enqueueSnackbar("Activate Account successfully. Please log in to continue.", { variant: 'success' });
                    navigate('/user/login');
                },
                onError: (error) => {
                    const errorCode = error.response?.data?.error;
                    switch (errorCode) {
                        case "INVALID_TOKEN":
                            return enqueueSnackbar("Token is invalid. User activation failed.", { variant: 'error' });
                        case "TOKEN_EXPIRED":
                            return enqueueSnackbar("Token expired. User activation failed.", { variant: 'error' });
                        case "USER_NOT_FOUND":
                            return enqueueSnackbar("User not found. User activation failed", { variant: 'error' });
                        default:
                            return enqueueSnackbar("Undefined error occurs. Please register account again.", { variant: 'error' });
                    }
                }
            });
        }
        else return;
    }, [token]);

    return (
        <Container direction="column" justifyContent="space-between">
            <Card variant="outlined">
                {token ?
                    <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, justifyContent: 'center' }}>
                        <Typography variant="h3" color="secondary">Activating your account…</Typography>
                        <CircularProgress />
                    </Box>
                    :
                    <Box sx={{ display: 'flex', flexDirection: "column", width: '100%', gap: 2, justifyContent: 'center' }} >
                        <Typography variant="h4" >Account Activation</Typography>
                        {!user ?
                            <>
                                {
                                    expired ?
                                        <Typography variant="p" color="secondary">Your account activation link is expired.</Typography>
                                        : <Typography variant="p" color="secondary">Your account is not activated.</Typography>
                                }
                                <Typography variant="p">Press 'Send' to send activation link to your mailbox.</Typography>

                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        sx={{ width: 'fit-content' }}
                                        loadingPosition="start"
                                        loading={isPending}
                                        endIcon={<SendIcon />}
                                        onClick={handleSubmit}
                                        disabled={!email}
                                    >
                                        {error ? "Resend" : "Send"}
                                    </Button>
                                </Box>
                            </>
                            :
                            <>
                                <Typography variant="p" color="primary">Your account has been activated.</Typography>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    startIcon={<HomeIcon />}
                                    onClick={() => navigate('/')}
                                >
                                    Back to Home
                                </Button>
                            </>
                        }
                    </Box>
                }
            </Card>
        </Container >
    )
}
