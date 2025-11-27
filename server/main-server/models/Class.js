import mongoose from "mongoose";
import mainDb from './../configs/mainDb.js';

const classSchema = new mongoose.Schema({
    classCode: { type: String, required: true },
    className: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    semester: { type: String, required: true },
    year: { type: String, required: true },
    schedule: {
        days: {
            type: [String],
            enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            required: true,
        },
        time: {
            type: String,
            match: /^([01]\d|2[0-3]):([0-5]\d)\s*-\s*([01]\d|2[0-3]):([0-5]\d)$/,
            required: true,
        },
        room: {
            type: String,
            required: true,
        }
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

// Exact-match fields
classSchema.index({ teacherId: 1 });
classSchema.index({ courseId: 1 });

// Sort-friendly fields
classSchema.index({ classCode: 1 });
classSchema.index({ className: 1 });
classSchema.index({ semester: 1 });
classSchema.index({ year: 1 });
classSchema.index({ status: 1 });

// Compound index for common list views
classSchema.index({ semester: 1, year: 1, classCode: 1 });

// Optional: if you want faster quick search
classSchema.index({
    classCode: "text",
    className: "text",
    semester: "text",
    year: "text"
});


const Class = mainDb.model('Class', classSchema);

export default Class;