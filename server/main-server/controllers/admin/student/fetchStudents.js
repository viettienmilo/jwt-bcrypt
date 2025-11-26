import UserProfile from '../../../models/UserProfile.js';

export default async function fetchStudents(req, res) {
    try {
        const students = await UserProfile.find({ role: 'STUDENT' })
        if (!students) return res.status(404).json({ error: "Students are empty." });
        res.status(200).json({ students })

    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}