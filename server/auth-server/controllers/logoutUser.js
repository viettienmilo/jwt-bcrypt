import User from './../models/User.js';

/* 
3. LOGOUT USER
    - delete refresh token from database
*/

const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        // check if refresh token exists
        if (!refreshToken) {
            return res.status(400).json({ message: 'No Refresh token provided' });
        }

        // check if user exists
        const user = await User.findOne({ refreshToken: refreshToken });
        if (!user) {
            // clear cookie and send response
            res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Strict', secure: true });
            return res.status(200).json({ message: 'User logged out already' });
        }

        // delete refresh token from database
        user.refreshToken = null;
        user.refreshTokenExpiration = null;
        await user.save();

        // clear cookie and send response
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Strict', secure: true });
        res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default logoutUser;