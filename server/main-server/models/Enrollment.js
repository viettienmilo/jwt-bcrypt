import mongoose from 'mongoose'
import mainDb from '../configs/mainDb.js'

const enrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }
);

const Enrollment = mainDb.model('Enrollment', enrollmentSchema);

export default Enrollment;