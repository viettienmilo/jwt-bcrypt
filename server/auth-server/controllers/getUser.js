import jwt from 'jsonwebtoken'
import User from './../models/User.js';

const getUser = async (req, res) => {
    const header = req.headers['authorization'];
    const accessToken = header.split(' ')[1];

    // check if accessToken valid
    if (!accessToken) {
        return res.status(401).json({ message: 'No accessToken provided' });
    }


    try {
        // get user from accessToken
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
        const userId = decode.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // send user back to client
        res.status(200).json({
            message: 'User authorized',
            user: {
                userId: user._id,
                username: user.username,
                role: user.role,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getUser;