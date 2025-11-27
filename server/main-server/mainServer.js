import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/userRoutes.js';
import internalRouter from './routes/internalRoutes.js';
import connectToCloudinary from './configs/cloudinary.js';
import adminCourseRouter from './routes/admin/adminCourseRoutes.js';
import adminUserRouter from './routes/admin/adminUserRoutes.js';


connectToCloudinary();

const server = express();

server.use(helmet()); // secure headers
server.use(morgan('dev')); // http request log
server.use(cors(
    {
        origin: process.env.CLIENT_URL,
        // allow cookies, 
        // make sure frontend uses fetch or axios with 
        // withCredentials: true when sending cookies (for refresh tokens).
        credentials: true
    }
));
server.use(cookieParser()); // read cookies from headers

server.get('/', (req, res) => {
    res.status(200).json({ message: "Main server is running" });
})

server.use('/api/user', userRouter);
server.use('/internal/user', internalRouter);
server.use('/api/admin/courses', adminCourseRouter);
server.use('/api/admin/users', adminUserRouter);

server.listen(process.env.MAIN_PORT, () => {
    console.log(`MAIN SERVER IS RUNNING ON PORT ${process.env.MAIN_PORT}`)
})







