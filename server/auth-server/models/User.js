import mongoose from "mongoose"
import authDb from './../configs/authDb.js';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, default: "" },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    isVerified: { type: Boolean, default: false },
    refreshToken: String,
    refreshTokenExpiration: Date,
    desc: { type: String, maxlength: 50 },
    city: { type: String, maxlength: 50 },
    oauth: {
        provider: { type: String, enum: ["google", "facebook", "github", null] },
        providerId: { type: String }
    }
}, { timestamps: true });

const User = authDb.model('User', userSchema);

export default User;