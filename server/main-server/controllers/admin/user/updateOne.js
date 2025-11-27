import UserProfile from './../../../models/UserProfile.js';

export default async function updateOne(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedUserProfile = await UserProfile.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        )

        if (!updatedUserProfile) return res.status(400).json({ error: "Account not found." });

        return res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." })
    }
}