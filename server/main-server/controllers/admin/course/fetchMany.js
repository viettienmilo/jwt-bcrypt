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

            // Teacher fields
            orConditions.push({ "teacher.lastname": regex });
            orConditions.push({ "teacher.firstname": regex });
        });

        // --- Aggregation pipeline ---
        const pipeline = [
            {
                $lookup: {
                    from: "userprofiles",
                    localField: "teacherId",
                    foreignField: "_id",
                    as: "teacher",
                },
            },
            { $unwind: "$teacher" },
        ];

        if (orConditions.length > 0) pipeline.push({ $match: { $or: orConditions } });

        // --- Sorting ---
        if (sort.length > 0) {
            const sortObj = {};
            sort.forEach(s => {
                if (s.field === "teacherName") {
                    sortObj["teacher.lastname"] = s.sort === "asc" ? 1 : -1;
                } else {
                    sortObj[s.field] = s.sort === "asc" ? 1 : -1;
                }
            });
            pipeline.push({ $sort: sortObj });
        }

        // --- Pagination ---
        pipeline.push({ $skip: page * pageSize });
        pipeline.push({ $limit: pageSize });

        // --- Fetch courses ---
        const courses = await Course.aggregate(pipeline);

        // --- Total count ---
        const countPipeline = [
            {
                $lookup: {
                    from: "userprofiles",
                    localField: "teacherId",
                    foreignField: "_id",
                    as: "teacher",
                },
            },
            { $unwind: "$teacher" },
        ];
        if (orConditions.length > 0) countPipeline.push({ $match: { $or: orConditions } });
        countPipeline.push({ $count: "total" });

        const totalCountResult = await Course.aggregate(countPipeline);
        const totalCount = totalCountResult[0]?.total ?? 0;

        // --- Simplify output ---
        const simplified = courses.map(course => ({
            _id: course._id,
            courseCode: course.courseCode,
            courseName: course.courseName,
            credits: course.credits,
            teacherId: course.teacher._id,
            teacherName: `${course.teacher.lastname} ${course.teacher.firstname} ${course.teacher.status === "inactive" ? "- (inactive)" : ""}`,
            description: course.description,
        }));

        res.status(200).json({ items: simplified, itemCount: totalCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}