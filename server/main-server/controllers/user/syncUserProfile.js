import UserProfile from '../../models/UserProfile.js';

export default async function syncUserProfile(req, res) {
    if (req.headers["x-internal-secret"] !== process.env.INTERNAL_SECRET_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { _id, studentCode, username, firstName, lastName, birthdate, avatarUrl, role } = req.body;

    const profile = await UserProfile.findOneAndUpdate(
        { _id },
        {
            userId: _id,
            studentCode,
            username,
            firstName,
            lastName,
            birthdate,
            avatarUrl,
        },
        { upsert: true, new: true }
    );

    res.json(profile);
}
