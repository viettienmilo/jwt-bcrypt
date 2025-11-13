import { Link as RouterLink } from 'react-router'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import SitemarkIcon from './../components/SitemarkIcon.jsx';
import Container from './../components/Container.jsx';
import Card from './../components/Card.jsx';

import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useNavigate, redirect } from 'react-router'
import useRegisterUser from './../api/useRegisterUser.js'

export async function loader(isAuthed) {
  return (isAuthed ? redirect('/dashboard') : null);
}

export default function SignUp(props) {

  // handle form input (react-hook-form)
  const {
    register,
    handleSubmit,
    formState: { errors, }
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  // hook for show snackbar
  const { enqueueSnackbar } = useSnackbar();
  // register user using tanstack mutation hook
  const { mutate, isPending } = useRegisterUser();
  const navigate = useNavigate();

  const onFormSubmit = (formData) => {
    mutate(formData,
      {
        onSuccess: (data) => {
          enqueueSnackbar(data.message || 'User registered successfully', { variant: 'success' });
          navigate('/login');
        },
        onError: (error) => {
          enqueueSnackbar(error.response?.data?.message || 'Registration failed', { variant: 'error' });
        },
      });
  }

  return (
    <Container direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <SitemarkIcon />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Register
        </Typography>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                fullWidth
                autoFocus
                variant="outlined"
                placeholder="Jon Snow"
                error={!!errors.username}
                helperText={errors.username?.message}
                {...register(
                  "username",
                  {
                    required: "Username is required",
                    minLength: { value: 4, message: "4 characters at least" },
                    maxLength: { value: 20, message: "10 characters maximum" },
                  })}
              />

            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
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
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button
              type="submit"
              fullWidth
              // variant="contained"
              variant="outlined"
              loading={isPending}
              loadingIndicator="Registering..."
            >
              Register
            </Button>
          </Box>
        </form>

        <Divider>
          <Typography sx={{ color: 'text.secondary' }}>or</Typography>
        </Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link
              component={RouterLink}  // to use Link of react-router
              to='/user/login'
              variant="body2"
              sx={{ alignSelf: 'center', color: "info.main" }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
