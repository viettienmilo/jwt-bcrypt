import ResetPasswordToken from './../models/ResetPasswordToken.js';
import { forgotPasswordEmailSchema } from './../validations/authValidations.js';
import mailSender from './../configs/nodemailer.js';
import crypto from 'crypto'
import User from './../models/User.js';

export default async function forgotPassword(req, res) {
    const { error, value } = forgotPasswordEmailSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { email } = value;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(403).json({ message: "User is not valid" });
    }
    if (!user.isVerified) return res.status(403).json({ success: false, message: "User Account has not been activated yet." });

    const token = await ResetPasswordToken.create({
        userId: user._id,
        token: crypto.randomBytes(64).toString('hex'),
        expiresAt: Date.now() + 1000 * 60 * 60 * 2, // 2 hours
    });

    const mail = {
        from: process.env.SENDER_MAIL,
        to: email,
        subject: "Reset your password ✔",
        html: `
                <p><i>Please click on following link to reset your password: </i><p>
                <a href="${process.env.CLIENT_URL}/user/reset-password?token=${token.token}">Click to Reset</a>
            `
    }
    await mailSender.sendMail(mail);

    return res.status(201).json({
        message: "Email has been sent. Please check your mailbox to reset your password."
    });
}