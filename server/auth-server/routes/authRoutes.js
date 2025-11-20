import express from 'express'
import registerUser from './../controllers/registerUser.js';
import loginUser from './../controllers/loginUser.js';
import logoutUser from '../controllers/logoutUser.js';
import refreshAccessToken from './../controllers/refreshAccessToken.js';

import passport from 'passport';
import activateUser from './../controllers/activateUser.js';
import forgotPassword from './../controllers/forgotPassword.js';
import resetPassword from './../controllers/resetPassword.js';
import sendActivationLink from './../controllers/sendActivationLink.js';
import { googleCallback, facebookCallback, githubCallback } from './../controllers/oauthCallbacks.js';

const authRouter = express.Router()

/* 
1. REGISTER USER
    - check if user exists
    - if not, hash password
    - save user to database
    - send response
*/
authRouter.post('/register', registerUser);

// activate user
// authRouter.post('/activate', activateUser);
authRouter.get('/activate', activateUser);

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
authRouter.post('/refresh-token', refreshAccessToken);

/*
    ROUTER FOR OAUTH2 AUTHENTICATION
    GOOGE, FACEBOOK, ...
*/

// Google
authRouter.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/login/google/callback',
    passport.authenticate('google', { session: false }), googleCallback
);

// Facebook
authRouter.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRouter.get('/login/facebook/callback',
    passport.authenticate('facebook', { session: false }), facebookCallback
);

// Github
authRouter.get('/login/github', passport.authenticate('github', { scope: ['user:email'] }));
authRouter.get('/login/github/callback',
    passport.authenticate('github', {
        // failureRedirect: `${process.env.CLIENT_URL}/user/login`,
        session: false
    }), githubCallback
);

// forgot password
authRouter.post('/forgot-password', forgotPassword);
// reset password
authRouter.post('/reset-password', resetPassword);
// send activation link
authRouter.post('/send-activation-link', sendActivationLink);

export default authRouter;