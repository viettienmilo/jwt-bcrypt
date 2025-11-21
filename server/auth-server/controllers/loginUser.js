import bcrypt from 'bcrypt'
import AuthUser from './../models/AuthUser.js';
import { userLoginSchema } from './../validations/authValidations.js';
import {
    generateAccessToken,
    generateRefreshToken
} from './../tokens/generateTokens.js';
import { SuccessResponse, ErrorResponse } from './../utils/response.js';
import { ERROR } from '../constants/errorCodes.js';

/* 2. LOGIN USER */

async function checkPassword(passwordText, passwordHash) {
    return await bcrypt.compare(passwordText, passwordHash);
}

const loginUser = async (req, res) => {
    try {
        /* 
        1. Validate input using joi schema
        2. Validate user if existed and verified
        3. Validate password
        */
        const { error, value } = userLoginSchema.validate(req.body);
        if (error)
            return ErrorResponse(res, ERROR.VALIDATION_ERROR, 400, error.details[0].message);

        const { email, password } = value;
        const user = await AuthUser.findOne({ email })
        if (!user)
            return ErrorResponse(res, ERROR.INVALID_CREDENTIALS, 401);
        if (!user.isVerified)
            return ErrorResponse(res, ERROR.ACCOUNT_NOT_VERIFIED, 403, { userId: user._id, email: user.email });

        const isPasswordCorrect = await checkPassword(password, user.passwordHash);
        if (!isPasswordCorrect)
            return ErrorResponse(res, ERROR.INVALID_CREDENTIALS, 401);

        /* 
        1. Generate access and refresh token
        2. Save to database
        2. Return response to frontend
        */
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        user.refreshTokenExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "production", // localhost must be false
            sameSite: process.env.COOKIE_SAME_SITE === "production" ? "strict" : "lax",
            path: "/",            // important so cookie is sent to /auth/logout
            maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
        });

        return SuccessResponse(
            res,
            {
                accessToken,
                user: {
                    userId: user._id,
                    email: user.email,
                    role: user.role,
                    oauth: user.oauth,
                },
            },
            "LOGIN_SUCCESS",
            200,
        );

    } catch (error) {
        console.log(error);
        return ErrorResponse(res, ERROR.SERVER_ERROR, 500);
    }
}

export default loginUser;