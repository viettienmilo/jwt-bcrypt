import UserProfile from '../../../models/UserProfile.js';


export default async function fetchMany(req, res) {
    try {
        // --- Pagination ---
        const page = parseInt(req.query.page ?? 0);
        const pageSize = parseInt(req.query.pageSize ?? 10);

        // --- Sorting ---
        const sort = req.query.sort ? JSON.parse(req.query.sort) : [];

        // --- Quick search from toolbar ---
        const filterModel = req.query.filter
            ? JSON.parse(req.query.filter)
            : { quickFilterValues: [] };

        const orConditions = [];
        filterModel.quickFilterValues?.forEach(val => {
            const regex = new RegExp(val, "i");
            orConditions.push({ studentCode: regex });
            orConditions.push({ firstname: regex });
            orConditions.push({ lastname: regex });
            orConditions.push({ role: regex });
            orConditions.push({ status: regex });
        });

        // --- Build Mongo query ---
        let mongoQuery = UserProfile.find(orConditions.length > 0 ? { $or: orConditions } : {});

        // --- Sorting ---
        if (sort.length > 0) {
            const sortObj = {};
            sort.forEach(s => {
                sortObj[s.field] = s.sort === "asc" ? 1 : -1;
            });
            mongoQuery = mongoQuery.sort(sortObj);
        }

        // --- Count total for pagination ---
        const totalCount = await UserProfile.countDocuments(orConditions.length > 0 ? { $or: orConditions } : {});

        // --- Apply pagination ---
        const users = await mongoQuery.skip(page * pageSize).limit(pageSize);

        // --- Simplify output ---
        const simplified = users.map(user => ({
            _id: user._id,
            studentCode: user.studentCode,
            fullName: `${user.lastname} ${user.firstname}`,
            role: user.role,
            status: user.status,
        }));

        res.status(200).json({ items: simplified, itemCount: totalCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}