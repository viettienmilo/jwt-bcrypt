import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  FormLabel
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSnackbar } from 'notistack';
import useForgotPassword from '../hooks/auth/useForgotPassword.js';

function ForgotPassword({ open, handleClose, dialogForm }) {
  const { register, handleSubmit, formState: { errors } } = dialogForm;

  const { mutate, isPending, } = useForgotPassword();
  const { enqueueSnackbar } = useSnackbar();

  const onFormSubmit = (formData) => {
    const email = formData.diagEmail;
    mutate({ email }, {
      onSuccess: () => {
        enqueueSnackbar("Email has been sent. Please check your mailbox.", { variant: 'info' });
      },
      onError: (error) => {
        const errorCode = error.response?.data?.error;
        switch (errorCode) {
          case "USER_NOT_FOUND":
            return enqueueSnackbar("User not found", { variant: "error" });
          case "ACCOUNT_NOT_VERIFIED":
            return enqueueSnackbar("Account is not activated", { variant: "error" });
          default:
            return enqueueSnackbar("Undefined error occurs.", { variant: "error" });
        }
      },
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Reset password</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
        >
          <DialogContentText>
            Enter your account&apos;s email address, and we&apos;ll send you a link to
            reset your password.
          </DialogContentText>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              autoFocus
              margin="dense"
              placeholder="your_email@domain.com"
              type="text"
              fullWidth
              error={!!errors.diagEmail}
              helperText={errors.diagEmail?.message || "Enter your valid email to reset your password"}
              {...register(
                "diagEmail",
                {
                  required: "Email is required",
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' }
                })
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            type="submit"
            loading={isPending}
            loadingPosition='start'
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ForgotPassword;
