import { adminAPI } from './../../api/axiosInstance.js';

const courseData = {

    getAll: async ({ paginationModel, sortModel, filterModel }) => {
        try {
            const res = await adminAPI.get("/courses", { paginationModel, sortModel, filterModel });
            const items = res.data.items;
            const itemCount = res.data.itemCount;
            return { items, itemCount };

        } catch (err) {
            console.error("getAll error:", err);
            return { items: [], itemCount: 0 };
        }
    },

    getOne: async (id) => {
        const res = await adminAPI.get(`/courses/${id}`); // http://localhost:3000/api/admin/courses/id
        const item = res.data.course;
        return { item };
    },

    createOne: async (data) => {
        const res = await adminAPI.post('/courses/new', data);  // http://localhost:3000/api/admin/courses/new
        return res.data;
    },

    updateOne: async ({ id, data }) => {
        const res = await adminAPI.put(`/courses/${id}`, data); // http://localhost:3000/api/admin/courses/:id
        return res.data;
    },


    deleteOne: id => {
        adminAPI.delete(`/courses/${id}`).then(res => res.data);

    }
};

export default courseData;