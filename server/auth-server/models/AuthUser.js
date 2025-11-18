import mongoose from "mongoose"
import authDb from '../configs/authDb.js';

const authUserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    isVerified: { type: Boolean, default: false },
    refreshToken: String,
    refreshTokenExpiration: Date,
    oauth: {
        provider: { type: String, enum: ["google", "facebook", "github", null] },
        providerId: { type: String }
    }
}, { timestamps: true });

const AuthUser = authDb.model('AuthUser', authUserSchema);

export default AuthUser;