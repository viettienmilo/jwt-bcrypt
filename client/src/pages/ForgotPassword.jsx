import { Box, Button, FormControl, FormLabel, Typography, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import Container from './../components/Container.jsx';
import Card from './../components/Card.jsx';
import SitemarkIcon from './../components/SitemarkIcon.jsx';
import useForgotPassword from './../api/useForgotPassword.jsx';
import { useSnackbar } from 'notistack';
import SendIcon from '@mui/icons-material/Send';

const ForgotPassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: ""
        }
    });

    const { mutate, isPending, } = useForgotPassword();
    const { enqueueSnackbar } = useSnackbar();

    const onFormSubmit = (formData) => {
        mutate(formData, {
            onSuccess: (data) => {
                enqueueSnackbar(data.message || "Email has been sent. Please check your mailbox to reset your password.", { variant: 'info' });
            },
            onError: (error) => {
                enqueueSnackbar(error?.message || "Undefined Error", { variant: 'error' });
            },
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
                    Forgot Password?
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
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                autoFocus
                                fullWidth
                                type='text'
                                placeholder="your@email.com"
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email?.message || "Enter your valid email to reset your password"}
                                {...register(
                                    "email",
                                    {
                                        required: "Email is required",
                                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' }
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
                            endIcon={<SendIcon />}
                        >
                            Send
                        </Button>
                    </Box>
                </form>
            </Card>
        </Container>
    )
}

export default ForgotPassword