import Course from './../../models/Course.js';

export default async function deleteOne(req, res) {
    try {
        const { id } = req.params;
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) return res.status(401).json({ error: "Course not found." });
        return res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." });
    }
}