import mongoose from "mongoose";
import mainDb from './../configs/mainDb.js';

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
    credits: { type: Number, required: true },
    description: String,
}, { timestamps: true });

// courseSchema.virtual('classes', {
//     ref: "Class",
//     localField: "_id",
//     foreignField: "courseId",
// });

// courseSchema.set('toJSON', { virtuals: true });
// courseSchema.set('toObject', { virtuals: true });

const Course = mainDb.model('Course', courseSchema);

export default Course;