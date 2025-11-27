
import { Box } from '@mui/material';
import { useUIStore } from '../../../../store/useUserStore.js';

import GenericCreate from '../../../../components/protected/admin/GenericCreate.jsx';
import { adminStudentCRUD } from '../../../../data/adminCRUD.js';

export function loader(isAuthed) {
    if (!isAuthed) throw redirect('/user/login');
    useUIStore.getState().setDashboardSideMenuItem('Students');
    return null;
}

export default function StudentNew() {

    const baseSchema = [
        { name: 'studentCode', label: "Student Code", type: 'text', required: true, },
        { name: 'lastname', label: "Last Name", type: 'text', required: true, },
        { name: 'firstname', label: "First Name", type: 'text', required: true, },
        { name: 'birthdate', label: "Date of Birth", type: 'date', required: false, },
        { name: 'gender', label: "Gender", type: 'select', options: [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }], required: true, },
        { name: 'city', label: "City", type: 'text', required: false, },
        { name: 'phone', label: "Phone", type: 'text', required: false, },
        { name: 'status', label: "Status", type: 'select', options: [{ label: "active", value: "active" }, { label: "inactive", value: "inactive" }], required: true, },
    ]

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 0, p: 0
        }}>
            <GenericCreate
                title="New Student"
                breadcrums={{ title: 'Students', path: '/admin/students' }}
                schema={baseSchema}
                createOne={adminStudentCRUD.createOne}
            />
        </Box>
    )
}