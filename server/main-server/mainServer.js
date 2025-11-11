import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'

import authorizeUser from './middlewares/authorizeUser.js';
import authorizeRoles from './middlewares/authorizeRoles.js';

const server = express();
server.use(helmet()); // secure headers
server.use(morgan('dev')); // http request log
server.use(cors(
    {
        origin: process.env.CLIENT_URL, // http://localhost:3000
        // allow cookies, 
        // make sure frontend uses fetch or axios with 
        // withCredentials: true when sending cookies (for refresh tokens).
        credentials: true
    }
));
server.use(cookieParser()); // read cookies from headers
server.use(express.json()); // read/write json

server.get('/', (req, res) => {
    res.status(200).json({ message: "Main server is running" });
})

server.get('/api/admin/dashboard',
    authorizeUser,
    authorizeRoles('admin'),
    (req, res) => {
        res.json({ message: `Welcome Admin ${req.user.username}` });
    }
);

server.get('/api/sales/orders',
    authorizeUser,
    authorizeRoles('saler', 'admin'),
    (req, res) => {
        res.json({ message: `Welcome ${req.user.role} - you can manage sales here` });
    }
);

server.get('/api/customer/profile',
    authorizeUser,
    authorizeRoles('customer', 'admin', 'saler'),
    (req, res) => {
        res.json({ user: req.user });
    }
);

server.listen(process.env.PORT, () => {
    console.log(`MAIN SERVER IS RUNNING ON PORT ${process.env.PORT}`)
})







