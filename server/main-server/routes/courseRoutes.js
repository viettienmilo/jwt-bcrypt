import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from './../middlewares/authMiddleware.js';

import fetchMany from '../controllers/course/fetchMany.js';
import fetchOne from './../controllers/course/fetchOne.js';

const courseRouter = express.Router();

courseRouter.get('/',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchMany
);

courseRouter.get('/:id',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchOne
);


export default courseRouter;