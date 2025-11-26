import userAdminData from '../../../../data/admin/userAdminData.js';
import GenericDetail from '../../../../components/protected/admin/GenericDetail.jsx';
import Box from "@mui/material/Box";

import { useUIStore } from '../../../../store/useUserStore.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Users');
    return null;
}


const resource = {
    name: 'user',
    title: 'User',
    path: 'users',
    getOne: userAdminData.getOne,
    deleteOne: userAdminData.deleteOne,
};

const fields = [
    { name: 'studentCode', title: 'Code' },
    { name: 'fullName', title: 'Full Name' },
    { name: 'role', title: 'Role' },
    { name: 'status', title: 'Status' },
];

const UserDetail = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericDetail
                resource={resource}
                fields={fields}
            />
        </Box>
    )
}

export default UserDetail