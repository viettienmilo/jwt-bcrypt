import { adminAPI } from './../api/axiosInstance.js';
import createCRUD from './../utils/createCRUD.js';

export const adminCourseCRUD = createCRUD('courses', adminAPI);
export const adminUserCRUD = createCRUD('users', adminAPI);


export async function getTeacherOptions() {
    const res = await adminAPI.get('users/teachers'); //VITE_MAIN_API=http://localhost:3000/api/user/profile/teachers
    return res.data.teachers; // {id, fullName}
}