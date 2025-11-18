import jwt from 'jsonwebtoken'
import { ErrorResponse } from './../utils/response.js';
import { ERROR } from './../constants/errorCodes.js';

const authUserMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
        return ErrorResponse(res, ERROR.INVALID_TOKEN, 401);

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return ErrorResponse(res, ERROR.INVALID_TOKEN, 401);
    }
}

const authRoleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user)
            return ErrorResponse(res, ERROR.UNAUTHORIZED, 401);

        if (!allowedRoles.includes(user.role))
            return ErrorResponse(res, ERROR.PERMISSION_DENIED, 403);
        next();
    }
}

export { authUserMiddleware, authRoleMiddleware }
