import { Button, Divider, Typography, Stack, TextField, FormControl, FormLabel, MenuItem } from '@mui/material';
import { useUserStore, useUIStore } from './../../store/useUserStore.js';
import { redirect } from 'react-router';
import EditableAvatar from './../../components/protected/EditableAvatar.jsx';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from "react-hook-form";
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useRef, useState, useEffect } from 'react';
import useUpdateProfile from './../../hooks/user/useUpdateProfile.js';
import { useSnackbar } from 'notistack';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    const dashboardSideMenuItem = useUIStore.getState().dashboardSideMenuItem;
    if (dashboardSideMenuItem === 'My Profile') return null;
    useUIStore.getState().setDashboardSideMenuItem('My Profile');
    return null;
}

const Profile = () => {
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const [disableEdit, setDisableEdit] = useState(true);

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: user?.username ?? "",
            studentCode: user?.studentCode ?? crypto.randomUUID(),
            lastname: user?.lastname ?? "",
            firstname: user?.firstname ?? "",
            birthdate: user?.birthdate ?? null,
            city: user?.city ?? "",
            gender: user?.gender ?? "",
            phone: user?.phone ?? "",
        }
    });
    const { mutate, isPending } = useUpdateProfile();
    const { enqueueSnackbar } = useSnackbar();

    const focusedRef = useRef(null);

    const handleEdit = () => {
        setDisableEdit(!disableEdit);
    }

    useEffect(() => {
        if (!disableEdit) {
            focusedRef.current?.focus();
        }
    }, [disableEdit]);

    const onFormSubmit = (formData) => {
        mutate(formData, {
            onSuccess: (data) => {
                const updated = data.user;
                setUser({ ...updated, email: user.email });
                enqueueSnackbar("Your profile has been updated successfully", { variant: 'success' });
                setDisableEdit(true);
            },
            onError: () => {
                enqueueSnackbar("Update failed.", { variant: 'error' });
            }
        })
    }

    return (
        <Stack spacing={1} m={0} p={0}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                pt={2} px={2}>
                <Stack
                    direction='column'
                >
                    <Typography variant='subtitle1' color='primary'>
                        Welcome back, {user?.username}
                    </Typography>
                    <Typography variant='caption' color='text.secondary' fontStyle='italic'>
                        {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
                    </Typography>
                </Stack>
                <Button
                    variant='contained'
                    color='secondary'
                    sx={{ width: 100 }}
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                >
                    Edit
                </Button>
            </Stack>
            <Divider sx={{ mt: 1 }} />

            <Stack
                direction='column'
                spacing={2}
                pt={2} px={2}
            >
                <Typography variant='subtitle1' color='secondary'>Account Info</Typography>
                <Stack
                    direction='column'
                    spacing={2}
                    px={2}>
                    <EditableAvatar user={user} />
                    <FormControl sx={{ flex: 1 }} fullWidth>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <TextField
                            autoFocus
                            id="username"
                            type='text'
                            variant="outlined"
                            error={!!errors?.username}
                            helperText={errors?.username?.message || 'Edit Username'}
                            {
                            ...register('username', { required: "Username is required" })
                            }
                            disabled={disableEdit}
                            inputRef={focusedRef}
                        />
                    </FormControl>
                </Stack>
            </Stack>

            <Stack
                direction='column'
                spacing={2}
                pt={2} px={2}
            >
                <Typography variant='subtitle1' color='secondary'>Student Info</Typography>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={2}
                        px={2}
                    >
                        <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormLabel htmlFor="studentCode">Student Code (*)</FormLabel>
                            <TextField
                                id="studentCode"
                                type='text'
                                variant="outlined"
                                error={!!errors?.studentCode}
                                helperText={errors?.studentCode?.message || "(*) This UUID code is temporary. If it's not your student code, please update a new one."}
                                {
                                ...register('studentCode', { required: "Student Code is required" })
                                }
                                disabled={disableEdit}
                            />
                        </FormControl>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={2}
                        pt={2} px={2}
                    >
                        <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormLabel htmlFor="lastname">Last name (*)</FormLabel>
                            <TextField
                                fullWidth
                                id="lastname"
                                type='text'
                                variant="outlined"
                                error={!!errors?.lastname}
                                helperText={errors?.lastname?.message || 'Input your First name'}
                                {
                                ...register('lastname', { required: "Last name is required" })
                                }
                                disabled={disableEdit}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormLabel htmlFor="firstname">First name (*)</FormLabel>
                            <TextField
                                fullWidth
                                id='firstname'
                                type='text'
                                variant="outlined"
                                error={!!errors?.firstname}
                                helperText={errors?.firstname?.message || 'Input your Last name'}
                                {
                                ...register('firstname', { required: "First name is required" })
                                }
                                disabled={disableEdit}
                            />
                        </FormControl>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={2}
                        pt={2} px={2}
                    >
                        <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormLabel htmlFor="birthdate">Birth date (*)</FormLabel>
                            <Controller
                                name='birthdate'
                                id='birthdate'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            fullWidth
                                            sx={{
                                                '& .MuiButtonBase-root': {
                                                    height: '30px',
                                                    width: '30px',
                                                },
                                                '& .MuiInputBase-root': {
                                                    height: '32px',
                                                    width: '32px'
                                                },
                                                '& .MuiPickersSectionList-root': {
                                                    py: 1.2,
                                                },
                                            }}
                                            {...field}
                                            value={field.value ? dayjs(field.value) : null}
                                            onChange={(date) => field.onChange(date ? date.format("YYYY-MM-DD") : null)}
                                            slotProps={{
                                                textField: {
                                                    error: !!fieldState.error,
                                                    helperText:
                                                        fieldState.error?.message || "Select your birthdate",
                                                },
                                            }}
                                            disabled={disableEdit}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormLabel htmlFor="city">City</FormLabel>
                            <TextField
                                fullWidth
                                id='city'
                                type='text'
                                variant="outlined"
                                error={!!errors?.city}
                                helperText={errors?.city?.message || 'Input your city where you born'}
                                {
                                ...register('city')
                                }
                                disabled={disableEdit}
                            />
                        </FormControl>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={2}
                        pt={2} px={2}
                    >
                        <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormLabel id="gender">Gender (*)</FormLabel>
                            <Controller
                                fullWidth
                                name="gender"
                                control={control}
                                variant="outlined"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        error={!!errors?.gender}
                                        helperText={errors?.gender?.message || 'Gender is required'}
                                        disabled={disableEdit}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </TextField>
                                )}
                            >
                            </Controller>
                        </FormControl>
                        <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormLabel htmlFor="phone">Phone number</FormLabel>
                            <TextField
                                fullWidth
                                id='phone'
                                type='text'
                                variant="outlined"
                                error={!!errors?.phone}
                                helperText={errors?.phone?.message || 'Input your phone number'}
                                {
                                ...register('phone', { pattern: { value: /^[0-9]+$/, message: 'Invalid characters' } })
                                }
                                disabled={disableEdit}
                            />
                        </FormControl>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent='flex-end'
                        pt={3} px={2}
                    >
                        <Button
                            variant='outlined'
                            color='primary'
                            type='submit'
                            sx={{ width: { sm: '100%', md: 100 } }}
                            startIcon={<SaveIcon />}
                            disabled={disableEdit}
                        >
                            Save
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}

export default Profile
