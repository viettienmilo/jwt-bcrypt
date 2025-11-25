import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from './../middlewares/authMiddleware.js';


import fetchUserProfile from './../controllers/user/fetchUserProfile.js';
import createUserProfile from './../controllers/user/createUserProfile.js';
import updateUserProfile from './../controllers/user/updateUserProfile.js';
import { imageUploadMiddleware } from './../middlewares/uploadMiddleware.js';
import uploadImage from './../controllers/user/uploadImage.js';
import fetchTeacherMany from './../controllers/user/fetchTeacherMany.js';

const userRouter = express.Router()

userRouter.get(
    '/profile',
    authUserMiddleware,
    authRoleMiddleware("STUDENT", "TEACHER", "ADMIN"),
    fetchUserProfile
);

userRouter.post(
    '/profile/create',
    express.json(),
    createUserProfile
);

userRouter.post(
    '/profile/update',
    express.json(),
    authUserMiddleware,
    updateUserProfile
);

userRouter.post(
    '/upload/profile-picture',
    authUserMiddleware,
    imageUploadMiddleware.single('avatarUrl'),  // 'avatarUrl' comes from frontend formData
    uploadImage
);

userRouter.get(
    '/profile/teachers',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchTeacherMany
)

export default userRouter;