import { Card, Box, Stack, Typography, Button } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import { amber, blueGrey } from '@mui/material/colors';
import { useColorScheme } from '@mui/material/styles';
import { Fragment } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { saveEnrollment } from './../../services/studentServices.js';
import { useSnackbar } from 'notistack';

const ClassCard = ({ cls }) => {
    const scheme = useColorScheme();
    const student = useUserStore(state => state.user);
    const { enqueueSnackbar } = useSnackbar();

    const saveEnrollmentMutation = useMutation({
        mutationFn: (data) => saveEnrollment(data),
        onSuccess: () => enqueueSnackbar("Enroll successfully", { variant: 'success' }),
        onError: (error) => enqueueSnackbar(error.response?.data?.error || error.message, { variant: 'error' }),
    });

    const rows = [
        { title: 'Semester', value: `${cls.semester} / ${cls.year}` },
        { title: 'Professor', value: `${cls.teacher.lastname} ${cls.teacher.firstname}` },
        { title: 'Schedule', value: { days: cls.schedule.days.join(", "), time: cls.schedule.time, room: cls.schedule.room } },
    ];

    const isActive = cls.status === 'active';

    const handleEnrollClick = () => {
        const studentId = student._id;
        const classId = cls._id;
        const enrollmentDate = new Date().toISOString();
        saveEnrollmentMutation.mutate({ studentId, classId, enrollmentDate })
    }

    return (
        <Card
            variant='outlined'
            sx={{
                mb: 2, mx: 'auto', width: { sx: '100%', md: '50%' }, display: 'flex', flexDirection: 'row', p: 0,
            }}
        >
            <Box sx={{
                bgcolor: scheme.colorScheme === 'dark' ? amber[800] : amber[200],
                width: '33.33%', p: 2, m: 0
            }}
            >
                <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant='caption' color='text.secondary' sx={{ fontSize: '0.7rem' }}>
                            CLASS
                        </Typography>
                        <Typography variant='subtitle1' sx={{ fontWeight: 300 }}>
                            {cls.className}
                        </Typography>
                        <Typography variant='caption' sx={{ textAlign: 'right', width: '100%', display: 'block' }}>
                            {cls.classCode}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'start' }}>
                        <CircleIcon
                            sx={{
                                fontSize: '0.7rem',          // match caption text size
                                mr: 0.75,
                                color: isActive ? 'success.main' : 'error.main',
                            }}
                        />
                        <Typography variant="caption" sx={{ lineHeight: 1, fontWeight: 200 }}>
                            {isActive ? 'Ready for Enrollment' : 'Not Available'}
                        </Typography>
                    </Box>
                </Stack>

            </Box>
            <Stack sx={{
                flex: 1,
                bgcolor: scheme.colorScheme === 'dark' ? blueGrey[800] : blueGrey[100],
                p: 2,
                ml: -2,
                display: 'flex',
                flexDirection: 'column',
                position: "relative",
                overflow: "hidden" // important
            }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr', // left column 1/3, right column 2/3
                        gap: 1,
                        minHeight: 100,
                        mb: 1,
                    }}
                >
                    {rows.map((row) => (
                        <Fragment key={row.title}>
                            <Typography variant="caption" sx={{ fontWeight: 400, color: 'text.secondary' }}>
                                {row.title}
                            </Typography>
                            {row.title === 'Schedule' && row.value ? (
                                <Stack spacing={0.5}>
                                    <Typography variant="caption">Days: {row.value.days}</Typography>
                                    <Typography variant="caption">Time: {row.value.time}</Typography>
                                    <Typography variant="caption">Room: {row.value.room}</Typography>
                                </Stack>
                            ) : (
                                <Typography variant="caption">{row.value}</Typography>
                            )}
                        </Fragment>
                    ))}
                </Box>
                <Box sx={{
                    mt: "auto",
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <Button sx={{ borderRadius: 15, height: 30, color: 'white', fontWeight: 200, fontSize: '0.75rem' }}
                        variant='contained'
                        color='success'
                        onClick={handleEnrollClick}
                        disabled={!isActive}
                    >
                        Enroll Class
                    </Button>
                </Box>
            </Stack>
        </Card>
    )
}

export default ClassCard

