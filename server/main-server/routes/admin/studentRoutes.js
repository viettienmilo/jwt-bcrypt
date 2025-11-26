import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from '../../middlewares/authMiddleware.js';

import fetchStudents from './../../controllers/admin/student/fetchStudents.js';

const studentRouter = express.Router();

studentRouter.get('/', fetchStudents);


export default studentRouter;