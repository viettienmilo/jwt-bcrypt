import UserProfile from './../../models/UserProfile.js';

const createUserProfile = async (req, res) => {
    const userId = req.body.userId;

    const userProfile = await UserProfile.findOneAndUpdate(
        { _id: userId },
        {
            username: req.body.username || `user${Date.now()}`,
            firstname: req.body.firstname || '',
            lastname: req.body.lastname || '',
            avatarUrl: req.body.avatarUrl || '',
            role: 'STUDENT',
            desc: '',
            address: ''
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ user: userProfile });
}

export default createUserProfile;