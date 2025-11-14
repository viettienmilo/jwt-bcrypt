import mongoose from "mongoose";
import authDb from './../configs/authDb.js';

const activationTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

const ActivationToken = authDb.model("ActivationToken", activationTokenSchema);

export default ActivationToken;