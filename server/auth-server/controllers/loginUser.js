import bcrypt from 'bcrypt'
// import User from '../models/User.js';
import User from './../models/User.js';
import { userLoginSchema } from './../validations/authValidations.js';
import {
    generateAccessToken,
    generateRefreshToken
} from './../tokens/generateTokens.js';

/* 
2. LOGIN USER
    - check if user exists
    - if exists, check if password is correct
    - if correct, generate access token
    - send response
*/

const loginUser = async (req, res) => {
    try {
        // first, validate input
        const { error, value } = userLoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { email, password, rememberMe } = value;

        // then check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json({ message: 'Invalid user/email' })
        }

        // if user exists, check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: 'Password is incorrect' })
        }

        // if password is correct, generate access and refresh token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        user.refreshTokenExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        if (rememberMe) {
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.COOKIE_SECURE === 'production',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                sameSite: 'strict'
            });
        } else {
            res.cookie(
                "refreshToken",
                refreshToken,
                {
                    httpOnly: true,
                    secure: process.env.COOKIE_SECURE === 'production',
                    sameSite: 'strict'
                    // no maxAge → expires when browser closes
                });
        }

        await user.save();

        // send response
        res.status(200).json({
            message: 'User logged in successfully',
            accessToken: accessToken,
            user: { userId: user._id, role: user.role },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default loginUser;