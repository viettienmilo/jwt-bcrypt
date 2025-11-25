import GenericCreate from './../../../../components/protected/admin/GenericCreate.jsx';
import courseData from './../../../../data/courseData.js';
import userData from './../../../../data/userData.js';
import { useQuery } from '@tanstack/react-query';

import { Box, CircularProgress } from '@mui/material';
import { useMemo } from 'react';

import { useUIStore } from './../../../../store/useUserStore.js';


export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Courses');
    return null;
}

export default function CourseNew() {
    const { data: teachers, isLoading, isError, error } = useQuery({
        queryKey: ['teachers'],
        queryFn: userData.getAllTeachers,
    });

    const baseSchema = [
        { name: 'courseCode', label: "Course Code", type: 'text', required: true, },
        { name: 'courseName', label: "Course Name", type: 'text', required: true, },
        { name: 'semester', label: "Semester", type: 'text', required: true, },
        { name: 'credit', label: "Num of credits", type: 'number', required: true, },
    ]

    const courseSchema = useMemo(() => {
        if (!teachers) return baseSchema;
        return [
            ...baseSchema,
            { name: 'teacherId', label: "Teacher Name", type: "select", options: teachers, required: true }
        ]
    }, [teachers]);

    if (isLoading) {
        return (
            <Box sx={{
                display: 'flex', flex: 1, flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                width: '100%', m: 1,
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericCreate
                title="New Course"
                breadcrums={{ title: 'Courses', path: '/admin/courses' }}
                schema={courseSchema}
                createOne={courseData.createOne}
            />
        </Box>
    )
}