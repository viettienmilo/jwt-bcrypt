import User from './../models/User.js';
import { ErrorResponse, SuccessResponse } from './../utils/response.js';
import { ERROR } from './../constants/errorCodes.js';

/* 3. LOGOUT USER
    - delete refresh token from database
*/

const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken)
            return ErrorResponse(res, ERROR.INVALID_TOKEN, 400);

        const user = await User.findOne({ refreshToken });
        if (!user) {
            res.clearCookie(
                'refreshToken', {
                httpOnly: true,
                path: '/',
                secure: process.env.NODE_ENV === "production", // localhost must be false
                sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            });
            return ErrorResponse(res, ERROR.USER_NOT_FOUND, 401);
        }

        // delete refresh token from database
        user.refreshToken = null;
        user.refreshTokenExpiration = null;
        await user.save();

        // clear cookie and send response
        res.clearCookie(
            'refreshToken', {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === "production", // localhost must be false
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        });
        return SuccessResponse(res, null, "LOGOUT_SUCCESS", 200);

    } catch (error) {
        console.log(error);
        return ErrorResponse(res, ERROR.SERVER_ERROR, 500);
    }
}

export default logoutUser;