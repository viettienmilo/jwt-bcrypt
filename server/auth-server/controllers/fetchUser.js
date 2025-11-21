import AuthUser from './../models/AuthUser.js';

export default async function fetchUser(req, res) {
    try {
        const userId = req.params.userId;

        console.log(userId);

        const user = await AuthUser.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found." });
        const { email, role } = user;
        res.json({ email, role });

    } catch (err) {
        console.error("FETCH_USER_ERROR: __ ", err);
        res.status(500).json({ error: "Server error." });
    }
}