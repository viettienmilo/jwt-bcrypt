import mongoose from "mongoose"
import mainDb from './../configs/mainDb.js';

const userProfileSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    username: String,
    firstname: String,
    lastname: String,
    avatarUrl: String,
    role: { type: String, enum: ["STUDENT", "ADMIN"], default: "STUDENT" },
    desc: { type: String },
    address: { type: String },
}, { timestamps: true });

userProfileSchema.virtual('fullName').get(function () {
    return `${this.firstname} ${this.lastname}`;
});

const UserProfile = mainDb.model('UserProfile', userProfileSchema);

export default UserProfile;
