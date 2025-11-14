import ResetPasswordToken from './../models/ResetPasswordToken.js';
import User from './../models/User.js';
import bcrypt from 'bcrypt';

export default async function resetPassword(req, res) {
    const { token, password } = req.body;

    if (!token) return res.status(403).json({ success: false, message: "No token provided" });

    const record = await ResetPasswordToken.findOne({ token });
    if (!record) return res.status(403).json({ success: false, message: "Invalid token" });

    if (record.expiresAt < Date.now()) {
        await record.deleteOne();
        return res.status(403).json({ success: false, message: "Token expired" });
    }

    const user = await User.findById(record.userId);
    if (!user) return res.status(403).json({ success: false, message: "User not found" });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    await user.save();

    res.status(201).json({ message: "Password reset successfully. Please log in to continue." })
}