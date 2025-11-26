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
    path: 'courses',
    getOne: courseData.getOne
};

const fields = [
    { name: 'courseCode', title: 'Code' },
    { name: 'courseName', title: 'Course Name' },
    { name: 'credits', title: 'Num of Credits' },
    { name: 'teacherName', title: 'Teacher Name' },
    { name: 'description', title: 'Description' },
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