import express from 'express'
import registerUser from './../controllers/registerUser.js';
import loginUser from './../controllers/loginUser.js';
import logoutUser from '../controllers/logoutUser.js';
import refreshAccessToken from './../controllers/refreshAccessToken.js';
import getUser from './../controllers/getUser.js';

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
authRouter.post('/refresh', refreshAccessToken,);

// get user
authRouter.get('/user', getUser);

export default authRouter;