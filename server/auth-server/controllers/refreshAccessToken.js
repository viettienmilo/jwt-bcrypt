import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from '../tokens/generateTokens.js';
import User from '../models/User.js';

const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    // check if has refreshToken
    if (!refreshToken) {
        return res.status(401).json({ message: 'No Refresh token provided' });
    }

    try {
        // verify refreshToken
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

        // verify user
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // validate refreshToken and refreshTokenExpiration
        if (user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid Refresh token' });
        }
        if (user.refreshTokenExpiration < new Date()) {
            return res.status(403).json({ message: 'Refresh token expired' });
        }
        // if all is good, generate new access token
        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

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
        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default refreshAccessToken;