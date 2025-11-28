import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { useUIStore } from './../../../../store/useUserStore.js';

import GenericCreate from './../../../../components/protected/admin/GenericCreate.jsx';
import { adminCourseCRUD, getTeacherOptions } from './../../../../data/adminCRUD.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Courses');
    return null;
}

export default function CourseNew() {
    // const { data: teacherOptions, isLoading, isError, error } = useQuery({
    //     queryKey: ['teachers'],
    //     queryFn: getTeacherOptions,
    // });

    const baseSchema = [
        { name: 'courseCode', label: "Course Code", type: 'text', required: true, },
        { name: 'courseName', label: "Course Name", type: 'text', required: true, },
        { name: 'credits', label: "Num of credits", type: 'number', required: true, },
        { name: 'description', label: "Description", type: 'text', required: false, },
    ]

    // const courseSchema = useMemo(() => {
    //     if (!teacherOptions) return baseSchema;
    //     return [
    //         ...baseSchema,
    //         { name: 'teacherId', label: "Teacher Name", type: "select", options: teacherOptions, required: true }
    //     ]
    // }, [teacherOptions]);

    // if (isLoading) {
    //     return (
    //         <Box sx={{
    //             display: 'flex', flex: 1, flexDirection: 'column',
    //             alignItems: 'center', justifyContent: 'center',
    //             width: '100%', m: 1,
    //         }}
    //         >
    //             <CircularProgress />
    //         </Box>
    //     );
    // }
    // if (isError) {
    //     return (
    //         <Box sx={{ flexGrow: 1 }}>
    //             <Alert severity="error">{error.message}</Alert>
    //         </Box>
    //     );
    // }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericCreate
                title="New Course"
                breadcrums={{ title: 'Courses', path: '/admin' }}
                schema={baseSchema}
                createOne={adminCourseCRUD.createOne}
            />
        </Box>
    )
}