import Box from "@mui/material/Box";

import { useUIStore } from '../../../../store/useUserStore.js';

import { adminClassCRUD } from '../../../../data/adminCRUD.js';
import GenericDetail from '../../../../components/protected/admin/GenericDetail.jsx';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Classes');
    return null;
}


const resource = {
    name: 'class',
    title: 'Class',
    path: 'classes',
    getOne: adminClassCRUD.getOne,
    deleteOne: adminClassCRUD.deleteOne,
};

const fields = [
    { name: 'classCode', title: 'Code' },
    { name: 'className', title: 'Class Name' },
    { name: 'courseName', title: 'Course' },
    { name: 'teacherName', title: 'Teacher' },
    { name: 'semester', title: 'Semester' },
    { name: 'year', title: 'Year' },
    { name: 'scheduleDays', title: 'Day of Week' },
    { name: 'scheduleTime', title: 'Time From-To' },
    { name: 'scheduleRoom', title: 'Room at' },
    { name: 'status', title: 'Status' },
];

const ClassDetail = () => {
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

export default ClassDetail