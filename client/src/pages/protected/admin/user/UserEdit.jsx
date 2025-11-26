import { Box, CircularProgress } from '@mui/material';
import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import GenericEdit from '../../../../components/protected/admin/GenericEdit.jsx';
import userAdminData from './../../../../data/admin/userAdminData.js';
import { useUIStore } from '../../../../store/useUserStore.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Users');
    return null;
}

export default function UserEdit() {

    const { id } = useParams();
    const userKey = 'user';
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [userKey, id],
        queryFn: () => userAdminData.getOne(id),
        enabled: !!id,
    });

    const baseSchema = [
        { name: 'studentCode', label: "Code", type: 'text', disabled: true, },
        { name: 'fullName', label: "Full Name", type: 'text', disabled: true, },
        {
            name: 'role', label: "Role", type: 'select',
            options: [
                { value: "STUDENT", label: "Student", },
                { value: "TEACHER", label: "Teacher", },
                { value: "ADMIN", label: "Admin", }
            ],
            required: true,
        },
        {
            name: 'status', label: "Status", type: 'select',
            options: [
                { value: "active", label: "active" },
                { value: "inactive", label: "inactive" }
            ],
            required: true,
        },
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
        fullName: item.fullName,
        role: item.role,
        status: item.status,
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericEdit
                title={`User #${id}`}
                breadcrums={{ title: 'Users', path: '/admin/users' }}
                schema={baseSchema}
                updateOne={userAdminData.updateOne}
                defaultValues={defaultValues}
                invalidateKey={userKey}
            />
        </Box>
    )
}