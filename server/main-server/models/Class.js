import mongoose from "mongoose";
import mainDb from './../configs/mainDb.js';

const classSchema = new mongoose.Schema({
    classCode: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    semester: { type: String, required: true },
    year: { type: String, required: true },
    schedule: {
        days: [{
            type: String,
            enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            required: true,
        }],
        time: {
            type: String,
            match: /^[0-2]?\d:\d{2}\s*-\s*[0-2]?\d:\d{2}$/,
            required: true,
        },
        room: {
            type: String,
            required: true,
        }
    },
});

const Class = mainDb.model('Class', classSchema);

export default Class;