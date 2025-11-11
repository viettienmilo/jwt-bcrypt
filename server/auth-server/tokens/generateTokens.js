import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {
    const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '1h' }
    )
    return accessToken;
}

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: '30d' }
    )
    return refreshToken;
}

export { generateAccessToken, generateRefreshToken }