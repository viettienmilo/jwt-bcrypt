import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import SitemarkIcon from './../components/SitemarkIcon.jsx';

import ForgotPassword from '../components/ForgotPassword';
import Container from '../components/Container.jsx';
import Card from './../components/Card.jsx';


import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router'
import useLoginUser from './../api/useLoginUser.js';
import { useUserStore } from './../store/useUserStore.js';


export default function SignIn(props) {

  const navigate = useNavigate();

  // state management;
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setUser = useUserStore((state) => state.setUser);

  // react-hook-form
  const { register, handleSubmit, formState: { errors, } } = useForm();

  // tanstack-query
  const { mutate, isPending } = useLoginUser();

  // snackbar
  const { enqueueSnackbar } = useSnackbar();

  const onFormSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (data) => {
        enqueueSnackbar(data.message || "User logged in successfully", { variant: 'success' });
        setAccessToken(data.accessToken)
        setUser(data.user)
        navigate('/dashboard')
      },
      onError: (error) => {
        enqueueSnackbar(error.response?.data?.message || "Logged failed", { variant: 'error' });
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
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
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
                type='email'
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
            {/* <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
              {...register('rememberMe')}
            /> */}
            <ForgotPassword
            // open={open}
            // handleClose={handleClose}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={isPending}
              loadingIndicator="Logging in..."
            >
              Login
            </Button>
            <Link
              component="button"
              type="button"
              // onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Log in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Log in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </form>
      </Card>
    </Container>
  );
}
