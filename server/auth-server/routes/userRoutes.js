import express from 'express'
import fetchUserProfile from './../controllers/user/fetchUserProfile.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import uploadImage from './../controllers/user/uploadImage.js';
import { imageUploadMiddleware } from '../middlewares/uploadMiddleware.js';

const userRouter = express.Router()

userRouter.get('/profile', authMiddleware, fetchUserProfile);

userRouter.post(
    '/upload/profile-picture',
    authMiddleware,
    imageUploadMiddleware.single('profilePicture'),
    uploadImage);

export default userRouter;