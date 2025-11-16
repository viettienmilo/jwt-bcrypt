import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import { ErrorResponse } from '../utils/response.js';
import { ERROR } from '../constants/errorCodes.js';

const authMiddleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith('Bearer '))
            return ErrorResponse(res, ERROR.INVALID_TOKEN, 401);

        const accessToken = header.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
        } catch (error) {
            if (error.name === 'TokenExpiredError')
                return ErrorResponse(res, ERROR.TOKEN_EXPIRED, 401);
            return ErrorResponse(res, ERROR.INVALID_TOKEN, 401);
        }

        const userId = decoded.userId;
        const user = await User.findById(userId).select('-password');
        if (!user)
            return ErrorResponse(res, ERROR.USER_NOT_FOUND, 403);
        if (!user.isVerified)
            return ErrorResponse(res, ERROR.ACCOUNT_NOT_VERIFIED, 403);

        req.user = user;
        return next();

    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError')
            return ErrorResponse(res, ERROR.TOKEN_EXPIRED, 401);
        if (error.name === 'JsonWebTokenError')
            return ErrorResponse(res, ERROR.INVALID_TOKEN, 401);

        return ErrorResponse(res, ERROR.SERVER_ERROR, 500);
    }
};

export default authMiddleware;