import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import registerUser from './controllers/registerUser.js';
import loginUser from './controllers/loginUser.js';
import logoutUser from './controllers/logoutUser.js';
import refreshAccessToken from './controllers/refreshAccessToken.js';
import cookieParser from 'cookie-parser';
////////////////////////////////////////////////////////////
// AUTHENTICATION & AUTHORIZATION SERVER ///////////////////
// 1. Register user
// 2. Login user
// 3. Logout user
// 4. Refresh access token 
// 5. Middleware for protected routes
////////////////////////////////////////////////////////////

connectDB();

const server = express();
server.use(cors());
server.use(cookieParser());
server.use(express.json());

/* 
1. REGISTER USER
    - check if user exists
    - if not, hash password
    - save user to database
    - send response
*/
server.post('/auth/register', registerUser);

/* 
2. LOGIN USER
    - check if user exists
    - if exists, check if password is correct
    - if correct, generate access token
    - send response
*/
server.post('/auth/login', loginUser);

/* 
3. LOGOUT USER
    - delete refresh token from database
    - delete token from client (send {accessToken: ''})
*/
server.post('/auth/logout', logoutUser);

/* 
4. REFRESH ACCESS TOKEN
    - check if refresh token exists
    - if exists, check if refresh token is valid
    - if valid, generate new access token
    - send response
*/

server.post('/auth/refresh', refreshAccessToken);

server.listen(process.env.AUTH_PORT, () => {
    console.log(`--SERVER IS RUNNING ON PORT ${process.env.AUTH_PORT}`)
})






