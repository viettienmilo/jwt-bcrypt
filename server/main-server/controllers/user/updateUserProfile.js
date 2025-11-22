import UserProfile from './../../models/UserProfile.js';
import { userProfileSchema } from './../../validations/userProfileValidation.js';

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { error, value } = userProfileSchema.validate(req.body);
        if (error) return res.status(403).json({ error: error.details[0].message });

        const userProfile = await UserProfile.findOneAndUpdate(
            { _id: userId },
            {
                username: value.username || `user${Date.now()}`,
                studentCode: value.studentCode || `${crypto.randomUUID()}`,
                firstname: value.firstname || '_',
                lastname: value.lastname || '_',
                birthdate: value.birthdate || '',
                city: value.city || '',
                gender: value.gender || "Male",
                phone: value.phone || '',
            },
            { upsert: false, new: true, setDefaultsOnInsert: true }
        );
        res.json({ user: userProfile });
    } catch (error) {
        console.log(error.details[0].message)
        res.status(500).json({ error: error.details[0].message })
    }
}

export default updateUserProfile;