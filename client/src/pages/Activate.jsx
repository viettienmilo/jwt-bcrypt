import { useNavigate } from "react-router";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import useActivateUser from './../api/useActivateUser.js';
import { useSnackbar } from 'notistack';
import { Box } from "@mui/material";

export default function Activate() {
    // const [status, setStatus] = useState("loading");
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

    if (!token) {
        return (
            <Box sx={{ height: '100vh', display: 'flex', flexDirection: "column", gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                <h2>No activation token provided.</h2>
                <p>Please check your email for the correct activation link.</p>
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: "column", gap: 2, justifyContent: 'center', alignItems: 'center' }}>
            <h2>Activating your account…</h2>
            <CircularProgress />
        </Box>
    );
}
