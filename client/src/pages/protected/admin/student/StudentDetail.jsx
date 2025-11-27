import Box from "@mui/material/Box";

import { useUIStore } from '../../../../store/useUserStore.js';

import { adminStudentCRUD } from '../../../../data/adminCRUD.js';
import GenericDetail from '../../../../components/protected/admin/GenericDetail.jsx';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Students');
    return null;
}


const resource = {
    name: 'student',
    title: 'Student',
    path: 'students',
    getOne: adminStudentCRUD.getOne,
    deleteOne: adminStudentCRUD.deleteOne,
};

const fields = [
    { name: 'studentCode', title: 'Code' },
    { name: 'fullName', title: 'Full Name' },
    { name: 'birthdate', title: 'Date of Birth' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'phone', title: 'Phone' },
    { name: 'status', title: 'Status' },
];

const StudentDetail = () => {
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

export default StudentDetail