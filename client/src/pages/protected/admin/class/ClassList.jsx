import { Box, } from '@mui/material';
import { redirect } from 'react-router';

import { useUIStore } from '../../../../store/useUserStore.js';

import GenericList from './../../../../components/protected/admin/GenericList.jsx';
import { adminClassCRUD } from './../../../../data/adminCRUD.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Classes');
    return null;
}

const baseColumns = [
    { field: "classCode", headerName: "Code", flex: 1, headerAlign: 'center', align: 'center', },
    { field: "className", headerName: "Class Name", flex: 2, headerAlign: 'center' },
    { field: "courseName", headerName: "Course Name", flex: 2, headerAlign: 'center', align: 'center' },
    { field: "teacherName", headerName: "Teacher Name", flex: 2, headerAlign: 'center', align: 'center' },
    { field: "semester", headerName: "Semester", flex: 1, headerAlign: 'center', align: 'center' },
    { field: "year", headerName: "Year", flex: 1, headerAlign: 'center', align: 'center' },
    {
        field: "schedule",
        headerName: "Schedule",
        flex: 1,
        headerAlign: "center",
        align: "center",
        valueGetter: (params) => {
            return `${params.days.join(", ")} | ${params.time} | ${params.room}`;
        }
    },
    { field: "status", headerName: "Status", flex: 1, headerAlign: 'center', align: 'center' },
];

const ClassList = () => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericList
                title="Classes"
                columns={baseColumns}
                getMany={adminClassCRUD.getAll}
                deleteOne={adminClassCRUD.deleteOne}
                basePath="classes"
            />
        </Box>
    )
}

export default ClassList