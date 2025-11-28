import UserProfile from '../../../models/UserProfile.js';

export default async function fetchTeacherOptions(req, res) {
    try {
        const data = await UserProfile.find({ role: "TEACHER" });
        if (data.length === 0) return res.status(403).json({ error: "Not found." });

        let items = []
        data.forEach(t => items.push({
            value: t._id,
            label: `${t.lastname} ${t.firstname} ${t.status === 'inactive' ? '- (inactive)' : ''}`
        }));

        res.status(200).json({ items });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}