import mongoose from "mongoose";
import mainDb from './../configs/mainDb.js';
import UserProfile from './UserProfile.js';

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
    semester: String,
    credit: Number,
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }
});

const Course = mainDb.model('Course', courseSchema);

export default Course;