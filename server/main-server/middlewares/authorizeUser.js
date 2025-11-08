import jwt from 'jsonwebtoken'
import User from '../../auth-server/models/User.js';

/*
5. PROTECTED ROUTES
    - check if header authorization valid
    - check if access token exist
    - verify access token
    - verify user
    - transfer to next node of pipeline
*/

const authorizeUser = async (req, res, next) => {
    // check header authorization with Bearer
    const authHeader = req.header.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    // chech if access token exist
    const accessToken = header.split(' ')[1];
    if (!accessToken) {
        return res.status(400).json({ message: 'You have no authorizaton to access this page' });
    }

    try {
        // verify access token
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
        const user = await User.findById(decode.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // return user for next node
        req.user = user;
        next();

    } catch (error) {
        console.error('Auth middleware error:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access token expired' });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid access token' });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default authorizeUser