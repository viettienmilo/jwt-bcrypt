import Class from './../../../models/Class.js';

export default async function fetchMany(req, res) {
    try {
        const page = parseInt(req.query.page ?? 0);
        const pageSize = parseInt(req.query.pageSize ?? 10);

        const filterModel = req.query.filter
            ? JSON.parse(req.query.filter)
            : { quickFilterValues: [] };

        const sort = req.query.sort ? JSON.parse(req.query.sort) : [];

        // -----------------------------
        // Quick search → fast match stage
        // -----------------------------
        const orConditions = [];
        filterModel.quickFilterValues?.forEach(val => {
            const regex = new RegExp(val, "i");
            orConditions.push(
                { classCode: regex },
                { className: regex },
                { semester: regex },
                { year: regex },
                { status: regex },
                { "teacher.lastname": regex },
                { "teacher.firstname": regex },
                { "course.courseName": regex }
            );
        });

        // -----------------------------
        // Build sorting
        // -----------------------------
        const sortObj = {};

        for (const s of sort) {
            if (s.field === "teacherName") {
                sortObj.teacherName = s.sort === "asc" ? 1 : -1;
            } else {
                sortObj[s.field] = s.sort === "asc" ? 1 : -1;
            }
        }

        // -----------------------------
        // Pipeline
        // -----------------------------
        const pipeline = [
            // Reduce document size early
            {
                $project: {
                    classCode: 1,
                    className: 1,
                    semester: 1,
                    year: 1,
                    status: 1,
                    schedule: 1,
                    teacherId: 1,
                    courseId: 1
                }
            },

            // Quick search match
            ...(orConditions.length > 0
                ? [{ $match: { $or: orConditions } }]
                : []),

            // Join teacher
            {
                $lookup: {
                    from: "userprofiles",
                    localField: "teacherId",
                    foreignField: "_id",
                    as: "teacher",
                },
            },
            { $unwind: "$teacher" },

            // Join course
            {
                $lookup: {
                    from: "courses",
                    localField: "courseId",
                    foreignField: "_id",
                    as: "course",
                }
            },
            { $unwind: "$course" },

            // Compute fields for sort & output
            {
                $addFields: {
                    teacherName: {
                        $concat: ["$teacher.lastname", " ", "$teacher.firstname"]
                    },
                    courseName: "$course.courseName"
                }
            },

            // -----------------------------
            // Result + total count in 1 query
            // -----------------------------
            {
                $facet: {
                    items: [
                        ...(Object.keys(sortObj).length > 0 ? [{ $sort: sortObj }] : []),
                        { $skip: page * pageSize },
                        { $limit: pageSize }
                    ],
                    totalCount: [
                        { $count: "total" }
                    ]
                }
            }
        ];

        // -----------------------------
        // Execute query
        // -----------------------------
        const result = await Class.aggregate(pipeline);

        const items = result[0].items ?? [];
        const itemCount = result[0].totalCount[0]?.total ?? 0;

        res.status(200).json({ items, itemCount });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}



// export default async function fetchMany(req, res) {
//     try {
//         // --- Pagination ---
//         const page = parseInt(req.query.page ?? 0);
//         const pageSize = parseInt(req.query.pageSize ?? 10);

//         // --- Filters and sorting ---
//         const filterModel = req.query.filter
//             ? JSON.parse(req.query.filter)
//             : { quickFilterValues: [] };
//         const sort = req.query.sort ? JSON.parse(req.query.sort) : [];

//         // --- Quick search (toolbar) ---
//         const orConditions = [];
//         filterModel.quickFilterValues?.forEach(val => {
//             const regex = new RegExp(val, "i");

//             // Class fields
//             orConditions.push({ classCode: regex });
//             orConditions.push({ className: regex });
//             orConditions.push({ semester: regex });
//             orConditions.push({ year: regex });
//             orConditions.push({ status: regex });
//             const num = Number(val);
//             if (!isNaN(num)) orConditions.push({ credits: num });

//             // Teacher fields
//             orConditions.push({ "teacher.lastname": regex });
//             orConditions.push({ "teacher.firstname": regex });

//             // Course fields
//             orConditions.push({ "course.courseName": regex });
//         });

//         // --- Aggregation pipeline ---
//         const pipeline = [
//             {
//                 $lookup: {
//                     from: "userprofiles",
//                     localField: "teacherId",
//                     foreignField: "_id",
//                     as: "teacher",
//                 },
//             },
//             { $unwind: "$teacher" },
//             {
//                 $lookup: {
//                     from: "courses",
//                     localField: "courseId",
//                     foreignField: "_id",
//                     as: "course",
//                 }
//             },
//             { $unwind: "$course" },
//         ];

//         if (orConditions.length > 0) pipeline.push({ $match: { $or: orConditions } });

//         // --- Sorting ---
//         if (sort.length > 0) {
//             const sortObj = {};
//             sort.forEach(s => {
//                 if (s.field === "teacherName") {
//                     sortObj["teacher.firstname"] = s.sort === "asc" ? 1 : -1;
//                 } else {
//                     sortObj[s.field] = s.sort === "asc" ? 1 : -1;
//                 }
//             });
//             pipeline.push({ $sort: sortObj });
//         }

//         // --- Pagination ---
//         pipeline.push({ $skip: page * pageSize });
//         pipeline.push({ $limit: pageSize });

//         // --- Fetch courses ---
//         const classes = await Class.aggregate(pipeline);

//         // --- Total count ---
//         const countPipeline = [
//             {
//                 $lookup: {
//                     from: "userprofiles",
//                     localField: "teacherId",
//                     foreignField: "_id",
//                     as: "teacher",
//                 },
//             },
//             { $unwind: "$teacher" },
//             {
//                 $lookup: {
//                     from: "courses",
//                     localField: "courseId",
//                     foreignField: "_id",
//                     as: "course",
//                 }
//             },
//             { $unwind: "$course" },
//         ];

//         if (orConditions.length > 0) countPipeline.push({ $match: { $or: orConditions } });
//         countPipeline.push({ $count: "total" });

//         const totalCountResult = await Class.aggregate(countPipeline);
//         const itemCount = totalCountResult[0]?.total ?? 0;


//         const items = classes.map(cls => ({
//             ...cls,
//             teacherName: `${cls.teacher.lastname} ${cls.teacher.firstname} ${cls.teacher.status === "inactive" ? "- (inactive)" : ""}`,
//             courseName: cls.course.courseName
//         }));

//         res.status(200).json({ items, itemCount });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }