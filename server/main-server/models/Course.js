import mongoose from "mongoose";
import mainDb from './../configs/mainDb.js';

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
    credits: { type: Number, required: true },
    description: String,
}, { timestamps: true });

const Course = mainDb.model('Course', courseSchema);

export default Course;