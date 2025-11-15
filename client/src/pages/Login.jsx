import {
  Box,
  Button,
  Divider,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import {
  GoogleIcon,
  FacebookIcon,
} from '../components/CustomIcons';
import LoginIcon from '@mui/icons-material/Login';
import GitHubIcon from '@mui/icons-material/GitHub';
import SitemarkIcon from './../components/SitemarkIcon.jsx';
import ForgotPassword from '../components/ForgotPassword';
import Container from '../components/Container.jsx';
import Card from './../components/Card.jsx';
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack';
import { useNavigate, Link as RouterLink, redirect } from 'react-router'
import useLoginUser from './../api/useLoginUser.js';
import { useUserStore } from './../store/useUserStore.js';
import { useState } from 'react';

export async function loader(isAuthed) {
  return (isAuthed ? redirect('/user/dashboard') : null);
}

export default function SignIn(props) {

  const navigate = useNavigate();

  const setAccessToken = useUserStore((state) => state.setAccessToken); // state management;
  const setUser = useUserStore((state) => state.setUser);


  //const { register, handleSubmit, formState: { errors, } } = useForm(); // react-hook-form
  const { mutate, isPending } = useLoginUser();   // tanstack-query
  const { enqueueSnackbar } = useSnackbar();

  const [openDiag, setOpenDiag] = useState(false);

  const loginForm = useForm();
  const { register, handleSubmit, formState: { errors, } } = loginForm;

  const dialogForm = useForm();

  // handle OAuth login
  const handleOAuthLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_AUTH_API}/auth/login/${provider}`;
  };

  const handleClose = () => {
    setOpenDiag(false);
  }

  const onFormSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (response) => {
        enqueueSnackbar("User logged in successfully", { variant: 'success' });
        const { accessToken, user } = response.data;
        setAccessToken(accessToken)
        setUser(user);
        navigate('/user/dashboard')
      },
      onError: (error) => {
        const errorCode = error.response?.data?.error;
        switch (errorCode) {
          case "ACCOUNT_NOT_VERIFIED":
            const { email } = error.response?.data?.details;
            return navigate(`/user/activate?email=${email}`);
          case "ACTIVATION_EXPIRED":
            return navigate(`/user/activate?expired=true&email=${email}`);
          case "INVALID_CREDENTIALS":
            return enqueueSnackbar("Wrong Email or Password", { variant: "error" });
          default:
            return enqueueSnackbar("Undefined error occurs.", { variant: "error" });
        }
      },
    })
  };

  return (
    <Container direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <SitemarkIcon />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(1.5rem, 10vw, 1.75rem)' }}
        >
          Login
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
                helperText={errors.email?.message}
                {...register(
                  "email",
                  {
                    required: "Email is required",
                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' }
                  })
                }
              />
            </FormControl>
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
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              loading={isPending}
              loadingPosition='end'
              endIcon={<LoginIcon />}
            >
              Login
            </Button>
            <Link
              component="button"
              type="button"
              // onClick={() => navigate('/user/forgot-password')}
              onClick={() => setOpenDiag(true)}
              variant="body2"
              sx={{ alignSelf: 'center', color: "warning.main" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleOAuthLogin('google')}
              startIcon={<GoogleIcon />}
            >
              Log in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleOAuthLogin('facebook')}
              startIcon={<FacebookIcon />}
            >
              Log in with Facebook
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleOAuthLogin('github')}
              startIcon={<GitHubIcon fontSize='small' />}
            >
              Log in with Github
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                component={RouterLink}
                to='/user/register'
                variant="body2"
                sx={{ alignSelf: 'center', color: "info.main" }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </form>

        <ForgotPassword
          open={openDiag}
          handleClose={handleClose}
          dialogForm={dialogForm}
        />

      </Card>
    </Container>
  );
}
