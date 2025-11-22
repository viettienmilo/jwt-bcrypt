import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState, useRef } from "react";

import { Box, Typography, Button } from "@mui/material";
import Container from './../components/Container.jsx';
import Card from './../components/Card.jsx';
import SendIcon from '@mui/icons-material/Send';

import { useSnackbar } from 'notistack';
import useSendActivationLink from './../hooks/auth/useSendActivationLink.js';
import useActivateUser from './../hooks/auth/useActivateUser.js';
import useCreateUserProfile from './../hooks/user/useCreateProfile.js';

export default function Activate() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [error, setError] = useState(false);

    const { mutate: activateUserMutate } = useActivateUser();
    const { mutate: sendActivationLinkMutate, isPending } = useSendActivationLink();
    const { mutate: createUserProfileMutate } = useCreateUserProfile();

    const { enqueueSnackbar } = useSnackbar();

    const hasActivated = useRef(false);

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

        if (!token) return;
        // if (!token || hasActivated.current) {
        //     return;
        // }

        // hasActivated.current = true;

        activateUserMutate({ token }, {
            onSuccess: (data) => {
                const { userId } = data.data;
                createUserProfileMutate({ userId }, {
                    onSuccess: () => {
                        enqueueSnackbar("Activate Account successfully. Please log in to continue.", { variant: 'success' });
                        navigate('/user/login');
                    },
                    onError: () => {
                        enqueueSnackbar("Error on create User profile", { variant: 'error' });
                    }
                })
            },
            onError: (error) => {
                setError(true);
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
    }, []);

    return error && (
        <Container direction="column" justifyContent="space-between">
            <Card variant="outlined">
                <Box sx={{ display: 'flex', flexDirection: "column", width: '100%', gap: 2, justifyContent: 'center' }} >
                    <Typography variant="h4" >Account Activation</Typography>
                    <Typography variant="p" color="secondary">Your account activation link is expired.</Typography>
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
                            disabled={!email || isPending}
                        >
                            Resend
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Container >
    )
}
