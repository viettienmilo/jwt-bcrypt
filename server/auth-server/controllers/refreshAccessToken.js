import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from '../tokens/generateTokens.js';
import AuthUser from '../models/AuthUser.js';
import { ErrorResponse, SuccessResponse } from './../utils/response.js';
import { ERROR } from './../constants/errorCodes.js';

const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return ErrorResponse(res, ERROR.INVALID_TOKEN, 401);

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
        const user = await AuthUser.findById(decoded.userId).select('-password');
        if (!user)
            return ErrorResponse(res, ERROR.USER_NOT_FOUND, 404);

        if (user.refreshToken !== refreshToken)
            return ErrorResponse(res, ERROR.INVALID_TOKEN, 403);

        if (user.refreshTokenExpiration < new Date())
            return ErrorResponse(res, ERROR.TOKEN_EXPIRED, 403);

        // if all is good, 
        // generate new access token
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        // Update user in DB 
        user.refreshToken = newRefreshToken;
        user.refreshTokenExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await user.save();

        // Re-set the cookie with proper options
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // localhost must be false
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            path: "/",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // Send new access token back
        return SuccessResponse(res, { accessToken: newAccessToken });

    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError')
            return ErrorResponse(res, ERROR.TOKEN_EXPIRED, 401);
        if (error.name === 'JsonWebTokenError')
            return ErrorResponse(res, ERROR.INVALID_TOKEN, 401);

        return ErrorResponse(res, ERROR.SERVER_ERROR, 500);
    }
}

export default refreshAccessToken;