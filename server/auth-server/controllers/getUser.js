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

        // if user found, return all info EXCEPT password
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // send user back to client
        res.status(200).json({
            message: 'User authorized',
            user: {
                useId: user._id,
                ...user.toObject(),
            }
        });

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.error('Error in getUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getUser;