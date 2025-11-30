import mongoose from 'mongoose'
import mainDb from '../configs/mainDb.js'

const attendanceSchema = new mongoose.Schema({
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
    attendanceDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Attendance = mainDb.model('Attendance', attendanceSchema);

export default Attendance;