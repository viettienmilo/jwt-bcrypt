import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from './../../middlewares/authMiddleware.js';
import fetchTeacherMany from './../../controllers/admin/user/fetchTeacherMany.js';

const userAdminRouter = express.Router();

userAdminRouter.get(
    '/teachers',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchTeacherMany
)



export default userAdminRouter;