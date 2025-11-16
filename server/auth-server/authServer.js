import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectToCloudinary from './configs/cloudinary.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'
import passportConfig from './configs/authStrategies.js'
import passport from 'passport'
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';

////////////////////////////////////////////////////////////
// AUTHENTICATION & AUTHORIZATION SERVER ///////////////////
// 1. Register user
// 2. Login user
// 3. Logout user
// 4. Refresh access token 
////////////////////////////////////////////////////////////

connectToCloudinary();

const server = express();

server.use(helmet()); // secure headers
server.use(morgan('dev')); // http request log

server.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,               // allow cookies/headers
    })
);
server.use(cookieParser()); // read cookies from headers
server.use(express.json()); // read/write json

passportConfig(passport);
server.use(passport.initialize());

// test route
server.get('/', (req, res) => {
    res.status(200).json({ message: "AuthServer API running" })
});

// auth routes for handle register/login/logout and refresh access token
server.use('/api/auth', authRouter)
// user routes for handle users
server.use('/api/user', userRouter)

// global error handler
server.use(errorHandlerMiddleware);

// start server
server.listen(process.env.AUTH_PORT, () => {
    console.log(`-- AUTH SERVER RUNNING ON PORT ${process.env.AUTH_PORT}`);
});







