export default function createCRUD(resource, api) {
    return {
        getAll: async ({ paginationModel, sortModel, filterModel }) => {
            try {
                const res = await api.get(`/${resource}`, {
                    params: {
                        page: paginationModel.page,
                        pageSize: paginationModel.pageSize,
                        sort: JSON.stringify(sortModel),
                        filter: JSON.stringify(filterModel)
                    }
                });

                return {
                    items: res.data.items,
                    itemCount: res.data.itemCount
                };
            } catch (err) {
                console.error(`${resource}.getAll error:`, err);
                return { items: [], itemCount: 0 };
            }
        },

        getOne: async (id) => {
            const res = await api.get(`/${resource}/${id}`);
            return res.data; // e.g. "course" from "courses"
        },

        createOne: async (data) => {
            const res = await api.post(`/${resource}/new`, data);
            return res.data;
        },

        updateOne: async ({ id, data }) => {
            const res = await api.put(`/${resource}/${id}`, data);
            return res.data;
        },

        deleteOne: async (id) => {
            const res = await api.delete(`/${resource}/${id}`);
            return res.data;
        }
    };
}