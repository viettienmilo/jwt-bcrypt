import express from 'express'
import { authUserMiddleware, authRoleMiddleware } from './../../middlewares/authMiddleware.js';
import fetchCourses from './../../controllers/student/enrollment/fetchCourses.js';
import saveEnrollment from './../../controllers/student/enrollment/saveEnrollment.js';

const studentEnrollmentRouter = express.Router();

studentEnrollmentRouter.get(
    '/courses-to-enroll',
    fetchCourses
);

studentEnrollmentRouter.post(
    '/enroll',
    express.json(),
    saveEnrollment
)

export default studentEnrollmentRouter;