import mongoose from "mongoose"
import mainDb from './../configs/mainDb.js';

const userProfileSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    studentCode: { type: String, required: true, default: '00000000' },
    username: { type: String, required: true, default: `user#${Date.now()}` },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthdate: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female"], default: "Male" },
    phone: String,
    city: String,
    avatarUrl: String,
    role: { type: String, enum: ["STUDENT", "TEACHER", "ADMIN"], default: "STUDENT" },
    status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

userProfileSchema.virtual('fullName').get(function () {
    return `${this.lastname} ${this.firstname}`;
});

const UserProfile = mainDb.model('UserProfile', userProfileSchema);

export default UserProfile;
