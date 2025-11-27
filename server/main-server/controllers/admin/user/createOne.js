import UserProfile from '../../../models/UserProfile.js';

export default async function createOne(req, res) {
    try {
        const newUser = new UserProfile(req.body);
        await newUser.save({
            // validateBeforeSave: true,
            timestamps: true,
        });

        if (!newUser) return res.status(400).json({ error: "Create failed." });

        return res.status(200).json();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}