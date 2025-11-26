import { Box, CircularProgress } from '@mui/material';
import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import GenericEdit from './../../../../components/protected/admin/GenericEdit.jsx';
import courseData from './../../../../data/courseData.js';
import userData from './../../../../data/userData.js';
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
        queryFn: () => courseData.getOne(id),
        enabled: !!id,
    });

    const { data: teachers, isLoading: isTeacherLoading, isError: isTeacherError, error: teacherError } = useQuery({
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
        semester: item.semester,
        credit: item.credit,
        teacherId: item.teacherId,
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
                updateOne={courseData.updateOne}
                defaultValues={defaultValues}
                invalidateKey={courseKey}
            />
        </Box>
    )
}