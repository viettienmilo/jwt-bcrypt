import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from '../middlewares/authMiddleware.js';

import fetchStudents from '../controllers/student/fetchStudents.js';

const studentRouter = express.Router();

studentRouter.get('/', fetchStudents);


export default studentRouter;