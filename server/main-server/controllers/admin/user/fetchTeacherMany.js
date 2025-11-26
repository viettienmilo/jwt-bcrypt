import UserProfile from './../../../models/UserProfile.js';


export default async function fetchTeacherMany(req, res) {
    try {
        const teachers = await UserProfile.find({ role: "TEACHER" });
        if (teachers.length === 0) return res.status(403).json({ error: "Teachers are empty" });

        let info = []
        teachers.forEach(t => info.push({ value: t._id, label: `${t.lastname} ${t.firstname}` }));

        res.status(200).json({ teachers: info });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}