import Course from './../../../models/Course.js';

export default async function fetchOne(req, res) {
    try {
        const id = req.params.id;

        const course = await Course.findById(id)?.populate('teacherId', 'lastname firstname status');

        if (!course) return res.status(401).json({ error: "Course not found." });

        const courseInfo = {
            _id: course._id,
            courseCode: course.courseCode,
            courseName: course.courseName,
            credits: course.credits,
            teacherId: course.teacherId._id,
            teacherName: `${course.teacherId.lastname} ${course.teacherId.firstname} ${course.teacherId.status === 'inactive' ? '- (inactive)' : ''}`,
            description: course.description,
        }
        res.status(200).json({ item: courseInfo });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}