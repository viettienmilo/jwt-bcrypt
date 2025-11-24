import { adminAPI } from './../api/axiosInstance';

const courseData = {
    getAll: async ({ paginationModel, sortModel, filterModel }) => {
        try {
            const res = await adminAPI.get("/courses", { paginationModel, sortModel, filterModel });

            const items = (res.data.items).map(item => ({
                ...item,
                id: item._id,  // _id → id for DataGrid
                teacherName: `${item.teacherId.lastname} ${item.teacherId.firstname}`, // teacherId → teacherName
            }));
            const itemCount = res.data.itemCount;
            return { items, itemCount };

        } catch (err) {
            console.error("getAll error:", err);
            return { items: [], itemCount: 0 };
        }
    },
    getOne: async (id) => {
        const res = await adminAPI.get(`/courses/${id}`); // http://localhost:3000/api/admin/courses/id
        const course = res.data.course;
        const item = { ...course, teacherName: `${course.teacherId.lastname} ${course.teacherId.firstname}` };
        return { item };
    },
    deleteOne: id => adminAPI.delete(`/courses/${id}`).then(res => res.data),
};

export default courseData;