import Course from './../../models/Course.js';

export default async function createOne(req, res) {
    try {
        const { courseCode, courseName, credits, teacherId, description } = req.body;

        const newCourse = await Course.create({
            courseCode, courseName, credits, teacherId, description,
        });

        if (!newCourse) return res.status(400).json({ error: "Create new course failed." });

        return res.status(200).json();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}