import { adminAPI } from './../api/axiosInstance.js';
import createCRUD from './../utils/createCRUD.js';

export const adminCourseCRUD = createCRUD('courses', adminAPI);
export const adminUserCRUD = createCRUD('users', adminAPI);

export const adminStudentCRUD =
{
    getAll: async ({ paginationModel, sortModel, filterModel }) => {
        const mergeFilter = {
            quickFilterValues: filterModel?.quickFilterValues ?? [],
            items: [
                ...(filterModel?.items ?? []),
                { field: "role", operator: "eq", value: "STUDENT" }
            ]
        };
        return adminUserCRUD.getAll({ paginationModel, sortModel, filterModel: mergeFilter });
    },

    getOne: adminUserCRUD.getOne,
    createOne: adminUserCRUD.createOne,
    updateOne: adminUserCRUD.updateOne,
    deleteOne: adminUserCRUD.deleteOne,
}

export const adminClassCRUD = createCRUD('classes', adminAPI);



export async function getTeacherOptions() {
    const res = await adminAPI.get('/users/teachers'); //VITE_MAIN_API_ADMIN=http://localhost:3000/api/admin/users/teachers
    return res.data.items; // {id, fullName}
}

export async function getCourseOptions() {
    const res = await adminAPI.get('/courses/course-options'); //VITE_MAIN_API_ADMIN=http://localhost:3000/api/admin/courses/course-options
    return res.data.items; // {id, fullName}
}
