import Class from './../../../models/Class.js';

export default async function fetchOne(req, res) {
    try {
        const id = req.params.id;

        const data = await Class.findById(id)?.populate('teacherId', 'lastname firstname status').populate('courseId', 'courseName');

        if (!data) return res.status(401).json({ error: "Not found." });

        const item = {
            ...data.toObject(),
            teacherName: `${data.teacherId.lastname} ${data.teacherId.firstname}${data.teacherId.status === 'inactive' ? ' - (inactive)' : ''}`,
            courseName: data.courseId.courseName,
            scheduleDays: data.schedule.days.join(", "),
            scheduleTime: data.schedule.time,
            scheduleRoom: data.schedule.room
        }
        // console.log(item)
        res.status(200).json({ item });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}