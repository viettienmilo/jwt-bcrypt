import { Box, } from '@mui/material';
import { redirect } from 'react-router';

import { useUIStore } from '../../../../store/useUserStore.js';
import GenericList from '../../../../components/protected/admin/GenericList.jsx';
import courseData from './../../../../data/admin/courseData.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Courses');
    return null;
}

const courseColumns = [
    { field: "courseCode", headerName: "Code", flex: 1, headerAlign: 'center', align: 'center' },
    { field: "courseName", headerName: "Course Name", flex: 2, headerAlign: 'center' },
    { field: "credits", headerName: "Num of Credits", flex: 1, headerAlign: 'center', align: 'center' },
    { field: "teacherName", headerName: "Teacher Name", flex: 2, headerAlign: 'center', align: 'center' },
    { field: "description", headerName: "Description", flex: 2, headerAlign: 'center', align: 'center' },
];

const CourseList = () => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericList
                title="Courses"
                columns={courseColumns}
                getMany={courseData.getAll}
                deleteOne={courseData.deleteOne}
                basePath="courses"
            />
        </Box>
    )
}

export default CourseList