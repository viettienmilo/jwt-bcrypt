import Course from './../../../models/Course.js';

export default async function fetchCourseOptions(req, res) {
    try {
        const courses = await Course.find({});
        if (courses.length === 0) return res.status(403).json({ error: "Not found." });

        let items = [];
        courses.forEach(c => items.push({
            value: c._id,
            label: c.courseName
        }));

        res.status(200).json({ items });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}