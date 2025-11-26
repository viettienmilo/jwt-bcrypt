import express from 'express'

import { authUserMiddleware, authRoleMiddleware } from './../../middlewares/authMiddleware.js';

import fetchMany from './../../controllers/admin/course/fetchMany.js';
import fetchOne from './../../controllers/admin/course/fetchOne.js';
import deleteOne from './../../controllers/admin/course/deleteOne.js';
import createOne from './../../controllers/admin/course/createOne.js';
import updateOne from './../../controllers/admin/course/updateOne.js';

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