import { Box, } from '@mui/material';
import { redirect } from 'react-router';

import { useUIStore } from '../../../../store/useUserStore.js';
import GenericList from '../../../../components/protected/admin/GenericList.jsx';
import { adminCourseCRUD } from './../../../../data/adminCRUD.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Courses');
    return null;
}

const courseColumns = [
    { field: "courseCode", headerName: "Code", headerAlign: 'center', align: 'center' },
    { field: "courseName", headerName: "Course Name", flex: 1, headerAlign: 'center' },
    { field: "credits", headerName: "Credits", headerAlign: 'center', align: 'center' },
    { field: "description", headerName: "Description", flex: 2, headerAlign: 'center' },
];

const CourseList = () => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0,
        }}>
            <GenericList
                title="Courses"
                columns={courseColumns}
                getMany={adminCourseCRUD.getAll}
                deleteOne={adminCourseCRUD.deleteOne}
                basePath="courses"
            />
        </Box>
    )
}

export default CourseList