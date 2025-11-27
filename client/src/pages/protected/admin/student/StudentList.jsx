import { Box, } from '@mui/material';
import { redirect } from 'react-router';

import { useUIStore } from '../../../../store/useUserStore.js';

import GenericList from '../../../../components/protected/admin/GenericList.jsx';
import { adminStudentCRUD } from '../../../../data/adminCRUD.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Students');
    return null;
}

const userColumns = [
    { field: "studentCode", headerName: "Code", flex: 1, headerAlign: 'center', align: 'center' },
    { field: "fullName", headerName: "Full Name", flex: 2 },
    { field: "birthdate", headerName: "Date of Birth", flex: 1, headerAlign: 'center', align: 'center' },
    { field: "gender", headerName: "Gender", flex: 1, headerAlign: 'center', align: 'center' },
    { field: "city", headerName: "City", flex: 1, headerAlign: 'center', align: 'center' },
    { field: "phone", headerName: "Phone", flex: 1, headerAlign: 'center', align: 'center' },
    { field: "status", headerName: "Status", flex: 1, headerAlign: 'center', align: 'center' },
];

const StudentList = () => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericList
                title="Students"
                columns={userColumns}
                getMany={adminStudentCRUD.getAll}
                deleteOne={adminStudentCRUD.deleteOne}
                basePath="students"
                noCreate={false}
            />
        </Box>
    )
}

export default StudentList