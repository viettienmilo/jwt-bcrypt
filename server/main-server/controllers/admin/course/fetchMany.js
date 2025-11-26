import Course from './../../../models/Course.js';


export default async function fetchMany(req, res) {
    try {
        const page = parseInt(req.query.paginationModel?.page ?? 0);
        const pageSize = parseInt(req.query.paginationModel?.pageSize ?? 10);
        const filter = req.query.filter ? JSON.parse(req.query.filter) : [];
        const sort = req.query.sort ? JSON.parse(req.query.sort) : [];

        // Build MongoDB query based on filter
        let query = {};
        filter.forEach(f => {
            if (f.value) query[f.field] = f.value;
        });

        let mongoQuery = Course.find(query).populate({
            path: "teacherId",
            select: "lastname firstname",
        });

        // Apply sorting
        if (sort.length > 0) {
            const sortObj = {};
            sort.forEach(s => {
                sortObj[s.field] = s.sort === "asc" ? 1 : -1;
            });
            mongoQuery = mongoQuery.sort(sortObj);
        }

        const totalCount = await Course.countDocuments(query);

        const courses = await mongoQuery
            .skip(page * pageSize)
            .limit(pageSize)

        let simplified = [];
        courses.forEach(course => simplified.push({
            _id: course._id,
            courseCode: course.courseCode,
            courseName: course.courseName,
            credits: course.credits,
            teacherId: course.teacherId._id,
            teacherName: `${course.teacherId.lastname} ${course.teacherId.firstname}`,
            description: course.description,
        }));

        res.status(200).json({
            items: simplified,
            itemCount: totalCount,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}