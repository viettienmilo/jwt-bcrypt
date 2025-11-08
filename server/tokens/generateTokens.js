import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {
    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '30m' }
    )
    return accessToken;
}

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: '7d' }
    )
    return refreshToken;
}

export { generateAccessToken, generateRefreshToken }