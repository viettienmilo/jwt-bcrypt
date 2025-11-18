import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from './../middlewares/authMiddleware.js';
import fetchUserProfile from './../controllers/user/fetchUserProfile.js';
import createUserProfile from './../controllers/user/createUserProfile.js';

const userRouter = express.Router()

userRouter.get('/profile', authUserMiddleware, authRoleMiddleware("STUDENT", "ADMIN"), fetchUserProfile);

userRouter.post('/create-profile', createUserProfile);

// userRouter.post(
//     '/upload/profile-picture',
//     authMiddleware,
//     imageUploadMiddleware.single('profilePicture'),
//     uploadImage);

export default userRouter;