import { generateAccessToken } from './../tokens/generateTokens.js';
import syncUserProfileToMainServer from './../utils/syncUserProfile.js';

async function oauthCallbackController(req, res) {
    const user = req.user.user; // from passport-google
    const refreshToken = req.user.refreshToken;
    const normalized = req.user.normalized;
    const accessToken = generateAccessToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "production", // localhost must be false
        sameSite: process.env.COOKIE_SAME_SITE === "production" ? "strict" : "lax",
        path: "/",            // important so cookie is sent to /auth/logout
        maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
    });

    await syncUserProfileToMainServer({
        _id: user._id,
        studentCode: '00000000',
        username: normalized.username,
        firstName: normalized.firstName,
        lastName: normalized.lastName,
        birthdate: new Date('2000-01-01'),
        avatarUrl: normalized.avatarUrl,
    });

    res.redirect(`${process.env.CLIENT_URL}/auth/success?accessToken=${accessToken}`);
}

export const googleCallback = oauthCallbackController;
export const facebookCallback = oauthCallbackController;
export const githubCallback = oauthCallbackController;