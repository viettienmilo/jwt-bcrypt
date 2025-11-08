import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectAuthDB from './configs/authDb.js';
import authRoutes from './routes/authRoutes.js';

////////////////////////////////////////////////////////////
// AUTHENTICATION & AUTHORIZATION SERVER ///////////////////
// 1. Register user
// 2. Login user
// 3. Logout user
// 4. Refresh access token 
////////////////////////////////////////////////////////////

const server = express();

server.use(helmet()); // secure headers
server.use(morgan('dev')); // http request log
server.use(cors(
    {
        origin: process.env.MAIN_SERVER_URL, // http://localhost:3000
        // allow cookies, 
        // make sure frontend uses fetch or axios with 
        // withCredentials: true when sending cookies (for refresh tokens).
        credentials: true
    }
));
server.use(cookieParser()); // read cookies from headers
server.use(express.json()); // read/write json

// test route
server.get('/auth', (req, res) => {
    res.status(200).json({ message: "AuthServer API running" })
});

// auth routes for handle register/login/logout and refresh access token
server.use('/auth', authRoutes)

// handle unexpected routes
server.use((req, res) => {
    res.status(404).send('Sorry, that page cannot be found!');
});

// global error handler
server.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

// start server
(async () => {
    try {
        await connectAuthDB();
        server.listen(process.env.AUTH_PORT, () => {
            console.log(`-- AUTH SERVER RUNNING ON PORT ${process.env.AUTH_PORT}`);
        });
    } catch (err) {
        console.error('Failed to start auth server:', err);
        process.exit(1);
    }
})();






