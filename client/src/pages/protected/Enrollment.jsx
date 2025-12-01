import { Box, CircularProgress, Alert, Typography, Card, Stack, CardHeader, CardContent, CardMedia, Button, Collapse } from '@mui/material'
import { redirect } from "react-router";
import Container from "../../components/Container";

import { getCoursesForEnrollment } from './../../services/studentServices.js';
import { useQuery } from '@tanstack/react-query';
import CourseCard from './../../components/protected/CourseCard.jsx';

export function loader(isAuthed) {
    if (!isAuthed) {
        throw redirect('/user/login');
    }
    return null;
}

const Enrollment = () => {

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['courseForEnrol'],
        queryFn: getCoursesForEnrollment
    });

    if (isPending) {
        return (
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    m: 1,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Alert severity="error">{error.message}</Alert>
            </Box>
        );
    }

    return (
        <Stack>
            <Stack sx={{ mt: 14, mb: 8 }}>
                <Typography variant='h4'>
                    Courses for Enrollment
                </Typography>
            </Stack>
            {
                data.map(course => (
                    <CourseCard key={course._id} course={course} />
                ))
            }

        </Stack >
    )

}

export default Enrollment