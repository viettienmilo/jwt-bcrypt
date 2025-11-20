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

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    const dashboardSideMenuItem = useUIStore.getState().dashboardSideMenuItem;
    if (dashboardSideMenuItem === 'My Profile') return null;
    useUIStore.getState().setDashboardSideMenuItem('My Profile');
    return null;
}

const Profile = () => {
    const user = useUserStore(state => state.user);
    const uniqueId = crypto.randomUUID();
    const { register, control, handleSubmit, formState: { errors } } = useForm();

    const onFormSubmit = (formData) => {
        console.log(formData)
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
                // spacing={1}
                >
                    <Typography variant='subtitle1' color='primary'>
                        Welcome back, {user?.username}
                    </Typography>
                    <Typography variant='caption' color='text.secondary' fontStyle='italic'>
                        {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
                    </Typography>
                </Stack>
                <Button variant='contained' color='secondary' sx={{ width: 100 }}
                    startIcon={<EditIcon />}
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
                    // justifyContent="space-between"
                    spacing={2}
                    px={2}>
                    <EditableAvatar user={user} />
                    <FormControl sx={{ flex: 1 }} fullWidth>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <TextField
                            autoFocus
                            id="username"
                            type='text'
                            placeholder="viettienmilo"
                            variant="outlined"
                            error={!!errors?.username}
                            helperText={errors.username?.message || 'Edit Username'}
                            {
                            ...register('username', { required: "Username is required" })
                            }
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
                <form onClick={handleSubmit(onFormSubmit)}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={2}
                        px={2}
                    >
                        <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormLabel htmlFor="studentCode">Student Code</FormLabel>
                            <TextField
                                id="studentCode"
                                type='text'
                                variant="outlined"
                                defaultValue={uniqueId}
                                error={!!errors?.studentCode}
                                helperText={errors.studentCode?.message || 'Enter your student code'}
                                {
                                ...register('studentCode', { required: "Student Code is required" })
                                }
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
                            <FormLabel htmlFor="lastname">Last name</FormLabel>
                            <TextField
                                fullWidth
                                id="lastname"
                                type='text'
                                placeholder="Nguyen Viet"
                                variant="outlined"
                                error={!!errors?.lastname}
                                helperText={errors.lastname?.message || 'Input your First name'}
                                {
                                ...register('lastname', { required: "Last name is required" })
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormLabel htmlFor="firstname">First name</FormLabel>
                            <TextField
                                fullWidth
                                id='firstname'
                                type='text'
                                placeholder="Tien"
                                variant="outlined"
                                error={!!errors?.firstname}
                                helperText={errors.firstname?.message || 'Input your Last name'}
                                {
                                ...register('firstname', { required: "First name is required" })
                                }
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
                            <FormLabel htmlFor="birthdate">Birth date</FormLabel>
                            <Controller
                                name='birthdate'
                                id='birthdate'
                                control={control}
                                defaultValue={null}
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
                                placeholder="Nha Trang"
                                variant="outlined"
                                error={!!errors?.city}
                                helperText={errors.city?.message || 'Input your city where you born'}
                                {
                                ...register('city')
                                }
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
                            <FormLabel id="gender">Gender</FormLabel>
                            <Controller
                                fullWidth
                                name="gender"
                                control={control}
                                defaultValue=""
                                variant="outlined"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        error={!!errors.gender}
                                        helperText={errors.gender?.message || 'Gender is required'}
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
                                helperText={errors.phone?.message || 'Input your phone number'}
                                {
                                ...register('phone')
                                }
                            />
                        </FormControl>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={2}
                        pt={3} px={2}
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            sx={{ width: { sm: '100%', md: 100 } }}
                            startIcon={<SaveIcon />}
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
