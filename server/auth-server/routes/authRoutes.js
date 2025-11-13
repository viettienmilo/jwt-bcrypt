import express from 'express'
import registerUser from './../controllers/registerUser.js';
import loginUser from './../controllers/loginUser.js';
import logoutUser from '../controllers/logoutUser.js';
import refreshAccessToken from './../controllers/refreshAccessToken.js';
import getUser from './../controllers/getUser.js';
import uploadImage from './../controllers/uploadImage.js';
import uploadImageMiddleware from './../middlewares/uploadImage.js';
import authenticateMiddleware from './../middlewares/authenticate.js';
// import passport from 'passport';
import passportConfig from './../configs/authStrategies.js';
import passport from 'passport';
import { generateAccessToken } from './../tokens/generateTokens.js';

const authRouter = express.Router()

/* 
1. REGISTER USER
    - check if user exists
    - if not, hash password
    - save user to database
    - send response
*/
authRouter.post('/register', registerUser);

/* 
2. LOGIN USER
    - check if user exists
    - if exists, check if password is correct
    - if correct, generate access token
    - send response
*/
authRouter.post('/login', loginUser);

/* 
3. LOGOUT USER
    - delete refresh token from database
    - delete token from client (send {accessToken: ''})
*/
authRouter.post('/logout', logoutUser);

/* 
4. REFRESH ACCESS TOKEN
    - check if refresh token exists
    - if exists, check if refresh token is valid
    - if valid, generate new access token
    - send response
*/
authRouter.post('/refresh', refreshAccessToken);

// get user
authRouter.get('/user', authenticateMiddleware, getUser);

// upload profile picture
authRouter.post(
    '/upload/profile-picture',
    uploadImageMiddleware.single('profilePicture'),
    authenticateMiddleware,
    uploadImage);

/*
    ROUTER FOR OAUTH2 AUTHENTICATION
    GOOGE, FACEBOOK, ...
*/

// Google
authRouter.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/login/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const user = req.user;
        const token = generateAccessToken(user);
        res.json({ token });
    }
);

export default authRouter;