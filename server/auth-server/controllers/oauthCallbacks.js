import { generateAccessToken } from './../tokens/generateTokens.js';

const googleCallback = (req, res) => {
    const user = req.user.user;
    const normalized = req.user.normalized;
    const accessToken = generateAccessToken(user);
    const refreshToken = req.user.refreshToken;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // localhost must be false
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        path: "/",            // important so cookie is sent to /auth/logout
        maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
    });
    res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?accessToken=${accessToken}&userId=${user._id}&role=${user.role}&email=${encodeURIComponent(normalized.email)}&username=${encodeURIComponent(normalized.username)}&firstname=${encodeURIComponent(normalized.firstname)}&lastname=${encodeURIComponent(normalized.lastname)}&avatarUrl=${encodeURIComponent(normalized.avatarUrl)}`);
}

const facebookCallback = (req, res) => {
    const user = req.user.user;
    const normalized = req.user.normalized;
    const accessToken = generateAccessToken(user);
    const refreshToken = req.user.refreshToken;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // localhost must be false
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        path: "/",            // important so cookie is sent to /auth/logout
        maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
    });
    res.redirect(`${process.env.CLIENT_URL}/auth/facebook/callback?accessToken=${accessToken}&userId=${user._id}&role=${user.role}&email=${encodeURIComponent(normalized.email)}&username=${encodeURIComponent(normalized.username)}&firstname=${encodeURIComponent(normalized.firstname)}&lastname=${encodeURIComponent(normalized.lastname)}&avatarUrl=${encodeURIComponent(normalized.avatarUrl)}`);
}

const githubCallback = (req, res) => {
    const user = req.user.user;
    const normalized = req.user.normalized;
    const accessToken = generateAccessToken(user);
    const refreshToken = req.user.refreshToken;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // localhost must be false
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        path: "/",            // important so cookie is sent to /auth/logout
        maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
    });
    res.redirect(`${process.env.CLIENT_URL}/auth/github/callback?accessToken=${accessToken}&userId=${user._id}&role=${user.role}&email=${encodeURIComponent(normalized.email)}&username=${encodeURIComponent(normalized.username)}&firstname=${encodeURIComponent(normalized.firstname)}&lastname=${encodeURIComponent(normalized.lastname)}&avatarUrl=${encodeURIComponent(normalized.avatarUrl)}`);
}

export { googleCallback, facebookCallback, githubCallback }