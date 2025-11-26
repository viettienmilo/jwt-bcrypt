import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from './../../middlewares/authMiddleware.js';
import fetchTeacherMany from './../../controllers/admin/user/fetchTeacherMany.js';
import fetchMany from '../../controllers/admin/user/fetchMany.js';
import deleteOne from './../../controllers/admin/user/deleteOne.js';
import fetchOne from './../../controllers/admin/user/fetchOne.js';
import updateOne from './../../controllers/admin/user/updateOne.js';

const userAdminRouter = express.Router();

userAdminRouter.get(
    '/teachers',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchTeacherMany
);

userAdminRouter.get(
    '/users',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchMany
);

userAdminRouter.get(
    '/:id',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchOne
);

userAdminRouter.put(
    '/:id',
    express.json(),
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    updateOne
);

userAdminRouter.delete(
    '/:id',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    deleteOne
);

export default userAdminRouter;