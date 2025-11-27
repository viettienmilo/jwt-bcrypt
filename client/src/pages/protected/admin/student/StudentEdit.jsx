import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { useUIStore } from '../../../../store/useUserStore.js';

import { adminStudentCRUD } from '../../../../data/adminCRUD.js';
import GenericEdit from '../../../../components/protected/admin/GenericEdit.jsx';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Students');
    return null;
}

export default function StudentEdit() {

    const { id } = useParams();
    const uniqueKey = 'student';
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [uniqueKey, id],
        queryFn: () => adminStudentCRUD.getOne(id),
        enabled: !!id,
    });

    const baseSchema = [
        { name: 'studentCode', label: "Student Code", type: 'text', required: true, },
        { name: 'lastname', label: "Last Name", type: 'text', required: true, },
        { name: 'firstname', label: "First Name", type: 'text', required: true, },
        { name: 'birthdate', label: "Date of Birth", type: 'date', required: false, },
        { name: 'gender', label: "Gender", type: 'select', options: [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }], required: true, },
        { name: 'city', label: "City", type: 'text', required: false, },
        { name: 'phone', label: "Phone", type: 'text', required: false, },
        { name: 'status', label: "Status", type: 'select', options: [{ label: "active", value: "active" }, { label: "inactive", value: "inactive" }], required: true, },
    ]

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

    const item = data?.item;
    const defaultValues = {
        studentCode: item.studentCode,
        lastname: item.lastname,
        firstname: item.firstname,
        birthdate: item.birthdate,
        gender: item.gender,
        city: item.city,
        phone: item.phone,
        status: item.status,
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericEdit
                title={`Student #${id}`}
                breadcrums={{ title: 'Students', path: '/admin/students' }}
                schema={baseSchema}
                updateOne={adminStudentCRUD.updateOne}
                defaultValues={defaultValues}
                invalidateKey={uniqueKey}
            />
        </Box>
    )
}