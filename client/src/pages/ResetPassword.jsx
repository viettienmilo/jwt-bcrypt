import { Box, Button, FormControl, FormLabel, Typography, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import Container from './../components/Container.jsx';
import Card from './../components/Card.jsx';
import SitemarkIcon from './../components/SitemarkIcon.jsx';
import useResetPassword from './../api/useResetPassword.js';
import { useNavigate, useSearchParams } from 'react-router';
import { useSnackbar } from 'notistack';
import LockResetIcon from '@mui/icons-material/LockReset';

const ResetPassword = () => {

    const { register, handleSubmit, watch, unregister, formState: { errors } } = useForm({
        defaultValues: {
            password: ""
        }
    });

    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const { mutate, isPending } = useResetPassword();
    const { enqueueSnackbar } = useSnackbar();

    const onFormSubmit = (formData) => {
        const payload = { token, password: formData.password, }

        mutate(payload, {
            onSuccess: (data) => {
                enqueueSnackbar(data?.message || "Password reset successfully. Please log in to continue.", { variant: 'success' });
                navigate('/user/login');
            },
            onError: (error) => {
                enqueueSnackbar(error?.message || "Undefined error", { variant: 'error' });
            }
        })
    }

    return (
        <Container>
            <Card>
                <SitemarkIcon />
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(1.5rem, 10vw, 1.75rem)' }}
                >
                    Reset Password
                </Typography>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                fullWidth
                                type="password"
                                placeholder="••••••"
                                variant="outlined"
                                {...register(
                                    "password",
                                    {
                                        required: "Password is required",
                                        minLength: { value: 5, message: "5 characters at least" },
                                        maxLength: { value: 20, message: "20 characters maximum" },
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="retypePassword">Re-type Password</FormLabel>
                            <TextField
                                fullWidth
                                type="password"
                                placeholder="••••••"
                                variant="outlined"
                                error={!!errors.retypePassword}
                                helperText={errors.retypePassword?.message}
                                {...register(
                                    "retypePassword",
                                    {
                                        required: "Please re-type your password",
                                        validate: (value) => value === watch('password') || "Password did not match",
                                    })
                                }
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            loading={isPending}
                            loadingPosition="end"
                            endIcon={<LockResetIcon />}
                        >
                            Reset
                        </Button>
                    </Box>
                </form>
            </Card>
        </Container>
    )
}

export default ResetPassword;