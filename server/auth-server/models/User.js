import mongoose from "mongoose"
import connectAuthDB from './../configs/authDb.js';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: String,
    refreshTokenExpiration: Date,
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
})

const User = connectAuthDB.model('User', userSchema);

export default User;