import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from './../middlewares/authMiddleware.js';

import fetchCourses from '../controllers/course/fetchCourses.js';

const courseRouter = express.Router();

courseRouter.get('/', fetchCourses);



export default courseRouter;