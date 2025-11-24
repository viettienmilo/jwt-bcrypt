import Course from './../../models/Course.js';

export default async function fetchOne(req, res) {
    try {
        const id = req.params.id;

        const course = await Course.findById(id)?.populate('teacherId', 'lastname firstname');

        if (!course) return res.status(401).json({ error: "Course not found." });
        res.status(200).json({ course });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}