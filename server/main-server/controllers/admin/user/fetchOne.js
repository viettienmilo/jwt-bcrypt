import UserProfile from './../../../models/UserProfile.js';

export default async function fetchOne(req, res) {
    try {
        const id = req.params.id;

        const user = await UserProfile.findById(id)

        if (!user) return res.status(401).json({ error: "User not found." });

        const userInfo = {
            _id: user._id,
            studentCode: user.studentCode,
            fullName: `${user.lastname} ${user.firstname}`,
            role: user.role,
            status: user.status,
        }

        return res.status(200).json({ item: userInfo });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}