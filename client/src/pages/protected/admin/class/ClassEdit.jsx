import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { useUIStore } from '../../../../store/useUserStore.js';

import { adminClassCRUD, getTeacherOptions, getCourseOptions } from '../../../../data/adminCRUD.js';
import GenericEdit from '../../../../components/protected/admin/GenericEdit.jsx';
import { useMemo } from 'react';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Classes');
    return null;
}

export default function ClassEdit() {

    const { id } = useParams();

    const {
        data: teacherOptions,
        isLoading: isTeacherLoading,
        isError: isTeacherError,
        error: teacherError
    } = useQuery({
        queryKey: ['teacher'],
        queryFn: getTeacherOptions,
    });

    const {
        data: courseOptions,
        isLoading: isCourseLoading,
        isError: isCourseError,
        error: courseError
    } = useQuery({
        queryKey: ['course'],
        queryFn: getCourseOptions,
    });

    const uniqueKey = 'class';
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [uniqueKey, id],
        queryFn: () => adminClassCRUD.getOne(id),
        enabled: !!id && !!teacherOptions && !!courseOptions
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

    if (isLoading || isTeacherLoading) {
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
    if (isError || isTeacherError) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Alert severity="error">{error.message || teacherError.message}</Alert>
            </Box>
        );
    }

    const item = data?.item;

    const defaultValues = {
        classCode: item.classCode,
        className: item.className,
        courseId: item.courseId._id,
        teacherId: item.teacherId._id,
        semester: item.semester,
        year: item.year,
        schedule: {
            days: item.schedule?.days || [],
            time: item.schedule?.time || "",
            room: item.schedule?.room || ""
        },
        status: item.status,
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericEdit
                title={`Class #${id}`}
                breadcrums={{ title: 'Classes', path: '/admin/classes' }}
                schema={schema}
                updateOne={adminClassCRUD.updateOne}
                defaultValues={defaultValues}
                invalidateKey={uniqueKey}
            />
        </Box>
    )
}