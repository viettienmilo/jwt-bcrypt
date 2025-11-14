import ActivationToken from './../models/ActivationToken.js';
import User from './../models/User.js';

export default async function activateUser(req, res) {
    const { token } = req.body;
    if (!token) return res.status(403).json({ success: false, message: "No token provided" });

    const record = await ActivationToken.findOne({ token });
    if (!record) return res.status(403).json({ success: false, message: "Invalid token" });

    if (record.expiresAt < Date.now()) {
        await record.deleteOne();
        return res.status(403).json({ success: false, message: "Token expired" });
    }

    const user = await User.findById(record.userId);
    if (!user) return res.status(403).json({ success: false, message: "User not found" });

    user.isVerified = true;
    await user.save();

    await record.deleteOne();

    res.json({ success: true });
}