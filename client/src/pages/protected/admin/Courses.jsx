import { Box, Typography } from '@mui/material';
import { redirect } from 'react-router';
import GenericList from './../../../components/protected/admin/GenericList.jsx';
import { useUIStore } from './../../../store/useUserStore.js';
export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Courses');
    return null;
}

const courseColumns = [
    { field: "courseCode", headerName: "Cousre Code" },
    { field: "courseName", headerName: "Course Name", width: 180 },
    { field: "semester", headerName: "Semester" },
    { field: "credit", headerName: "Num of Credits" },
    { field: "teacherId", headerName: "Teacher" },
];

const Courses = () => {


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericList

                title="Courses"
                columns={courseColumns}
                // getMany={getManyStudents}
                // deleteOne={deleteStudent}
                basePath="/courses" />
        </Box>
    )
}

export default Courses