import Course from './../../../models/Course.js';


export default async function fetchMany(req, res) {
    try {
        // --- Pagination ---
        const page = parseInt(req.query.page ?? 0);
        const pageSize = parseInt(req.query.pageSize ?? 10);

        // --- Filters and sorting ---
        const filterModel = req.query.filter
            ? JSON.parse(req.query.filter)
            : { quickFilterValues: [] };
        const sort = req.query.sort ? JSON.parse(req.query.sort) : [];

        // --- Quick search (toolbar) ---
        const orConditions = [];
        filterModel.quickFilterValues?.forEach(val => {
            const regex = new RegExp(val, "i");

            // Course fields
            orConditions.push({ courseCode: regex });
            orConditions.push({ courseName: regex });
            orConditions.push({ description: regex });
            const num = Number(val);
            if (!isNaN(num)) orConditions.push({ credits: num });
        });

        // --- pipeline ---
        const baseMatch = [];
        if (orConditions.length > 0) baseMatch.push({ $match: { $or: orConditions } });

        // --- Sorting ---
        const sortStage = [];
        if (sort.length > 0) {
            const sortObj = {};
            sort.forEach(s => {
                sortObj[s.field] = s.sort === "asc" ? 1 : -1;
            });
            sortStage.push({ $sort: sortObj });
        }

        // --- Final aggregation
        const pipeline = [
            ...baseMatch,
            {
                $facet: {
                    items: [
                        ...sortStage,
                        // pagination
                        { $skip: page * pageSize },
                        { $limit: pageSize }
                    ],
                    count: [
                        { $count: "total" }
                    ]
                }
            }
        ];


        // --- Fetch courses ---
        const result = await Course.aggregate(pipeline);
        const items = result[0].items;
        const itemCount = result[0].count[0]?.total ?? 0;

        res.status(200).json({ items, itemCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}