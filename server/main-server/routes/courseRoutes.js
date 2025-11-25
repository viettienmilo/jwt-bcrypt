import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from './../middlewares/authMiddleware.js';

import fetchMany from '../controllers/course/fetchMany.js';
import fetchOne from './../controllers/course/fetchOne.js';
import deleteOne from './../controllers/course/deleteOne.js';
import createOne from './../controllers/course/createOne.js';
import updateOne from './../controllers/course/updateOne.js';

const courseRouter = express.Router();

courseRouter.get('/',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchMany,
);

courseRouter.get('/:id',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchOne,
);

courseRouter.delete('/:id',
    express.json(),
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    deleteOne,
);

courseRouter.post('/new',
    express.json(),
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    createOne,
)

courseRouter.put('/:id',
    express.json(),
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    updateOne,
)

export default courseRouter;