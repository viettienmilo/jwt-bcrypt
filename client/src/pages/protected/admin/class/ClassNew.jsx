import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { useUIStore } from '../../../../store/useUserStore.js';

import GenericCreate from '../../../../components/protected/admin/GenericCreate.jsx';
import { adminClassCRUD, getTeacherOptions, getCourseOptions } from '../../../../data/adminCRUD.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Classes');
    return null;
}

export default function ClassNew() {
    const { data: teacherOptions, isLoading: isTeacherLoading, isError: isTeacherError, error: teacherError } = useQuery({
        queryKey: ['teachers'],
        queryFn: getTeacherOptions,
    });

    const { data: courseOptions, isLoading: isCourseLoading, isError: isCourseError, error: courseError } = useQuery({
        queryKey: ['courses'],
        queryFn: getCourseOptions,
    });

    const schema = useMemo(() => {
        if (!teacherOptions || !courseOptions) return null;
        return [
            { name: 'classCode', label: "Code", type: 'text' },
            { name: 'className', label: "Class Name", type: 'text' },
            { name: 'courseId', label: "Course Name", type: 'select', options: courseOptions, required: true },
            { name: 'teacherId', label: "Teacher", type: 'select', options: teacherOptions, required: true },
            { name: 'semester', label: "Semester", type: 'text' },
            { name: 'year', label: "Year", type: 'text' },
            { name: 'schedule.days', label: "Days of Week", type: 'multiselect', options: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', "Sat", "Sun"] },
            {
                name: 'schedule.time', label: "Time From-To", type: 'text',
                pattern: /^([01]\d|2[0-3]):([0-5]\d)\s*-\s*([01]\d|2[0-3]):([0-5]\d)$/,
                placeholder: '13:00 - 17:00',
            },
            { name: 'schedule.room', label: "Room", type: 'text', },
            {
                name: 'status', label: "Status", type: 'select',
                options: [
                    { value: "active", label: "active" },
                    { value: "inactive", label: "inactive" }
                ],
                required: true,
            },
        ]
    }, [teacherOptions, courseOptions]);


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

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericCreate
                title="New Class"
                breadcrums={{ title: 'Classes', path: '/admin/classes' }}
                schema={schema}
                createOne={adminClassCRUD.createOne}
            />
        </Box>
    )
}