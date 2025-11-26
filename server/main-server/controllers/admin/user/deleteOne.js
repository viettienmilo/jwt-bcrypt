import UserProfile from '../../../models/UserProfile.js';

export default async function deleteOne(req, res) {
    try {
        const { id } = req.params;
        const deletedUser = await UserProfile.findByIdAndUpdate(
            id,
            { status: "inactive" }
        );
        if (!deletedUser) return res.status(401).json({ error: "User not found." });

        return res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}