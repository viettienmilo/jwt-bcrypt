import courseData from './../../../../data/courseData.js';
import GenericDetail from './../../../../components/protected/admin/GenericDetail.jsx';
import Box from "@mui/material/Box";

import { useUIStore } from './../../../../store/useUserStore.js';


export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Courses');
    return null;
}


const resource = {
    name: 'course',
    title: 'Course',
    // path: 'courses',
    path: 'courses',
    getOne: courseData.getOne
};

const fields = [
    { name: 'courseCode', title: 'Code' },
    { name: 'courseName', title: 'Course Name' },
    { name: 'semester', title: 'Semester' },
    { name: 'credit', title: 'Num of Credit' },
    { name: 'teacherName', title: 'Teacher Name' },
];

const CourseDetail = () => {
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

export default CourseDetail