import mongoose from "mongoose"
import mainDb from './../configs/mainDb.js';

const userProfileSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    studentCode: { type: String, require: true },
    username: { type: String, require: true },
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    birthdate: { type: Date, require: true },
    gender: { type: String, enum: ["Male", "Female"] },
    phone: String,
    city: String,
    avatarUrl: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

userProfileSchema.virtual('fullName').get(function () {
    return `${this.lastname} ${this.firstname}`;
});

const UserProfile = mainDb.model('UserProfile', userProfileSchema);

export default UserProfile;
