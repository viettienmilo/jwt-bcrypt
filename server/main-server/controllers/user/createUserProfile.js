import UserProfile from './../../models/UserProfile.js';

const createUserProfile = async (req, res) => {
    const { userId, role } = req.body;

    const userProfile = await UserProfile.findOneAndUpdate(
        { _id: userId },
        {
            _id: userId,
            studentCode: 'N/A',
            username: req.body.username || `user${Date.now()}`,
            firstname: req.body.firstname || '',
            lastname: req.body.lastname || '',
            birthdate: new Date(),
            avatarUrl: req.body.avatarUrl || '',
            role: role || 'STUDENT',
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ user: userProfile });
}

export default createUserProfile;