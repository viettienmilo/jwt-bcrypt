import { Box, } from '@mui/material';
import { redirect } from 'react-router';

import { useUIStore } from '../../../../store/useUserStore.js';

import GenericList from '../../../../components/protected/admin/GenericList.jsx';
import { adminUserCRUD } from './../../../../data/adminCRUD.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Users');
    return null;
}

const userColumns = [
    { field: "studentCode", headerName: "Code", flex: 1, headerAlign: 'center', align: 'center' },
    { field: "fullName", headerName: "Full Name", flex: 2 },
    { field: "role", headerName: "Role", flex: 1, headerAlign: 'center', align: 'center' },
    { field: "status", headerName: "Status", flex: 1, headerAlign: 'center', align: 'center' },
];

const UserList = () => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericList
                title="Users"
                columns={userColumns}
                getMany={adminUserCRUD.getAll}
                deleteOne={adminUserCRUD.deleteOne}
                basePath="users"
                noCreate={true}
            />
        </Box>
    )
}

export default UserList