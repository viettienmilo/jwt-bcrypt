import jwt from 'jsonwebtoken'
import User from './../models/User.js';

const authenticateMiddleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith('Bearer '))
            return res.status(401).json({ message: 'No token provided' });

        const accessToken = header.split(' ')[1];

        let decoded;
        try {
            decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
        } catch (err) {
            // If token expired, send a specific response
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Access token expired' });
            }
            return res.status(401).json({ message: 'Invalid token' });
        }

        const userId = decoded.userId;
        const user = await User.findById(userId).select('-password');
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        // check if user is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'User Account have not been activated yet.' })
        }

        req.user = user;
        return next();

    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Access token expired',
                code: 'TOKEN_EXPIRED'
            });
        }
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authenticateMiddleware;