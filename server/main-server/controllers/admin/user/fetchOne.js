import UserProfile from './../../../models/UserProfile.js';
import { formatToDDMMYYYY } from './../../../utils/dateFormat.js';

export default async function fetchOne(req, res) {
    try {
        const id = req.params.id;
        const user = await UserProfile.findById(id)

        if (!user) return res.status(401).json({ error: "Account not found." });

        const item = {
            ...user.toObject(),
            fullName: `${user.lastname} ${user.firstname}`,
            birthdate: formatToDDMMYYYY(user.birthdate),
        }

        return res.status(200).json({ item });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}