import UserProfile from './../../../models/UserProfile.js';
import { formatToDDMMYYYY } from './../../../utils/dateFormat.js';

export default async function fetchOne(req, res) {
    try {
        const id = req.params.id;
        const data = await UserProfile.findById(id);

        if (!data) return res.status(401).json({ error: "Not found." });

        const item = {
            ...data.toObject(),
            fullName: `${data.lastname} ${data.firstname}`,
            birthdate: formatToDDMMYYYY(data.birthdate),
        }

        return res.status(200).json({ item });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}