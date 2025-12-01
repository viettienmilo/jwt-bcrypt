import Enrollment from './../../../models/Enrollment.js';

export default async function saveEnrollment(req, res) {
    try {
        const data = req.body;
        const { studentId, classId } = data;

        const existed = await Enrollment.findOne({ studentId, classId });

        if (existed) return res.status(400).json({ error: "Already Enrolled." });

        const newEnrollment = new Enrollment(data);
        const result = await newEnrollment.save();
        if (!result) return res.status(400).json({ error: "Enroll failed." });

        return res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}