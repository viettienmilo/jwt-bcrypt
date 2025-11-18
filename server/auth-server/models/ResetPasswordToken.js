import mongoose from "mongoose";
import authDb from './../configs/authDb.js';

const resetPasswordTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

const ResetPasswordToken = authDb.model("ResetPasswordToken", resetPasswordTokenSchema);

export default ResetPasswordToken;