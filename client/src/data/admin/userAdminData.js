import { adminAPI } from '../../api/axiosInstance';

const userAdminData = {

    getAll: async ({ paginationModel, sortModel, filterModel }) => {
        try {
            const res = await adminAPI.get("/users/users", {
                params: {
                    page: paginationModel.page,
                    pageSize: paginationModel.pageSize,
                    sort: JSON.stringify(sortModel),
                    filter: JSON.stringify(filterModel)
                }
            });
            const items = res.data.items;
            const itemCount = res.data.itemCount;
            return { items, itemCount };

        } catch (err) {
            console.error("getAll error:", err);
            return { items: [], itemCount: 0 };
        }
    },

    getOne: async (id) => {
        const res = await adminAPI.get(`users/${id}`);
        return res.data;
    },

    updateOne: async ({ id, data }) => {
        const res = await adminAPI.put(`users/${id}`, data);
        return res.data;
    },

    deleteOne: async (id) => {
        const res = await adminAPI.delete(`users/${id}`);
        return res.data;
    },



    getAllTeachers: async () => {
        const res = await adminAPI.get('users/teachers'); //VITE_MAIN_API=http://localhost:3000/api/user/profile/teachers
        return res.data.teachers; // {id: --- , fullName: ---}
    },
}

export default userAdminData;