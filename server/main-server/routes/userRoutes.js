import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from './../middlewares/authMiddleware.js';
import { imageUploadMiddleware } from './../middlewares/uploadMiddleware.js';

import fetchUserProfile from './../controllers/user/fetchUserProfile.js';
import createUserProfile from './../controllers/user/createUserProfile.js';
import updateUserProfile from './../controllers/user/updateUserProfile.js';
import uploadImage from './../controllers/user/uploadImage.js';

const userRouter = express.Router()

userRouter.get(
    '/profile',
    express.json(),
    authUserMiddleware,
    authRoleMiddleware("STUDENT", "ADMIN"),
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

export default userRouter;