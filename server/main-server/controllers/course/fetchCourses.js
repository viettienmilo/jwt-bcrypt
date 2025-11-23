import Course from '../../models/Course.js';

export default async function fetchCourses(req, res) {
    try {
        const courses = await Course.find({});
        if (!courses) return res.status(404).json({ error: 'Courses are empty.' });
        res.status(200).json({ courses });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}