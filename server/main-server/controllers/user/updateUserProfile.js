import UserProfile from './../../models/UserProfile.js';

const updateUserProfile = async (req, res) => {
    const userId = req.user.userId;

    const userProfile = await UserProfile.findOneAndUpdate(
        { _id: userId },
        {
            username: req.body.username || `user${Date.now()}`,
            studentCode: req.body.studentCode || `${crypto.randomUUID()}`,
            firstname: req.body.firstname || '_',
            lastname: req.body.lastname || '_',
            birthdate: req.body.birthdate || '',
            city: req.body.city || '',
            gender: req.body.gender || '',
            phone: req.body.phone || '',
        },
        { upsert: false, new: true, setDefaultsOnInsert: true }
    );

    res.json({ user: userProfile });
}

export default updateUserProfile;