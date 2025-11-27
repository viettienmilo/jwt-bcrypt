import { Box, CircularProgress } from '@mui/material';
import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import GenericEdit from './../../../../components/protected/admin/GenericEdit.jsx';
import { adminCourseCRUD, getTeacherOptions } from './../../../../data/adminCRUD.js';
import { useUIStore } from './../../../../store/useUserStore.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Courses');
    return null;
}

export default function CourseEdit() {

    const { id } = useParams();
    const courseKey = 'course';
    const { data, isLoading: isCourseLoading, isError: isCourseError, error: courseError } = useQuery({
        queryKey: [courseKey, id],
        queryFn: () => adminCourseCRUD.getOne(id),
        enabled: !!id,
    });

    const { data: teacherOptions, isLoading: isTeacherLoading, isError: isTeacherError, error: teacherError } = useQuery({
        queryKey: ['teachers'],
        queryFn: getTeacherOptions,
    });

    const baseSchema = [
        { name: 'courseCode', label: "Course Code", type: 'text', required: true, },
        { name: 'courseName', label: "Course Name", type: 'text', required: true, },
        { name: 'credits', label: "Num of credits", type: 'number', required: true, },
        { name: 'description', label: "Description", type: 'text', required: false, },
    ]

    const courseSchema = useMemo(() => {
        if (!teacherOptions) return baseSchema;
        return [
            ...baseSchema,
            { name: 'teacherId', label: "Teacher Name", type: "select", options: teacherOptions, required: true }
        ]
    }, [teacherOptions]);

    if (isTeacherLoading || isCourseLoading) {
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
    if (isTeacherError || isCourseError) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Alert severity="error">{teacherError.message || courseError.message}</Alert>
            </Box>
        );
    }

    const item = data?.item;
    const defaultValues = {
        courseCode: item.courseCode,
        courseName: item.courseName,
        credits: item.credits,
        teacherId: item.teacherId,
        description: item.description,
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericEdit
                title={`Course #${id}`}
                breadcrums={{ title: 'Courses', path: '/admin' }}
                schema={courseSchema}
                updateOne={adminCourseCRUD.updateOne}
                defaultValues={defaultValues}
                invalidateKey={courseKey}
            />
        </Box>
    )
}