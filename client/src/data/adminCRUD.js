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





export async function getTeacherOptions() {
    const res = await adminAPI.get('users/teachers'); //VITE_MAIN_API=http://localhost:3000/api/user/profile/teachers
    return res.data.teachers; // {id, fullName}
}



// {
//     getAll: async ({ paginationModel, sortModel, filterModel }) => {
//         const mergeFilter = {
//             quickFilterValues: filterModel?.quickFilterValues ?? [],
//             items: [
//                 ...(filterModel?.items ?? []),
//                 { field: "role", operator: "eq", value: "STUDENT" }
//             ]
//         };
//         return adminUserCRUD.getAll({ paginationModel, sortModel, filterModel: mergeFilter });
//     },

//     getOne: adminUserCRUD.getOne,
//     createOne: adminUserCRUD.createOne,
//     updateOne: adminUserCRUD.updateOne,
//     deleteOne: adminUserCRUD.deleteOne,
// }