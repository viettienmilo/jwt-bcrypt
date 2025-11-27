import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from '../../middlewares/authMiddleware.js';

import fetchTeacherMany from '../../controllers/admin/user/fetchTeacherMany.js';
import fetchMany from '../../controllers/admin/user/fetchMany.js';
import deleteOne from '../../controllers/admin/user/deleteOne.js';
import fetchOne from '../../controllers/admin/user/fetchOne.js';
import updateOne from '../../controllers/admin/user/updateOne.js';
import createOne from './../../controllers/admin/user/createOne.js';


const adminUserRouter = express.Router();

adminUserRouter.get(
    '/',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchMany
);

adminUserRouter.get(
    '/:id',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchOne
);

adminUserRouter.post(
    '/new',
    express.json(),
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    createOne
);

adminUserRouter.put(
    '/:id',
    express.json(),
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    updateOne
);

adminUserRouter.delete(
    '/:id',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    deleteOne
);

adminUserRouter.get(
    '/teachers',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchTeacherMany
);

export default adminUserRouter;