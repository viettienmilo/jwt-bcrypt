import UserProfile from './../../models/UserProfile.js';
import { userProfileSchema } from './../../validations/userProfileValidation.js';

const updateUserProfile = async (req, res) => {
    const userId = req.user.userId;
    const { error, value } = userProfileSchema.validate(req.body);
    if (error) return res.json({ error: error.details[0].message });

    const userProfile = await UserProfile.findOneAndUpdate(
        { _id: userId },
        {
            username: value.username || `user${Date.now()}`,
            studentCode: value.studentCode || `${crypto.randomUUID()}`,
            firstname: value.firstname || '_',
            lastname: value.lastname || '_',
            birthdate: value.birthdate || '',
            city: value.city || '',
            gender: value.gender || '',
            phone: value.phone || '',
        },
        { upsert: false, new: true, setDefaultsOnInsert: true }
    );

    res.json({ user: userProfile });
}

export default updateUserProfile;