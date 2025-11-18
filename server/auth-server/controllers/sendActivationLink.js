import crypto from 'crypto'
import ActivationToken from '../models/ActivationToken.js';
import mailSender from './../configs/nodemailer.js';
import { ErrorResponse, SuccessResponse } from './../utils/response.js';
import { ERROR } from './../constants/errorCodes.js';
import AuthUser from './../models/AuthUser.js';

export default async function sendActivationLink(req, res) {
    const { email, username } = req.body;
    if (!email)
        return ErrorResponse(res, ERROR.INVALID_CREDENTIALS, 401);

    const user = await AuthUser.findOne({ email });
    if (!user)
        return ErrorResponse(res, ERROR.INVALID_CREDENTIALS, 401);

    await ActivationToken.deleteMany({ userId: user._id });

    const token = crypto.randomBytes(64).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await ActivationToken.create({
        userId: user._id,
        token: hashedToken,
        expiresAt: Date.now() + 1000 * 60 * 60 * 24,
    });

    const mail = {
        from: process.env.SENDER_MAIL,
        to: user.email,
        subject: "Activate account ✔",
        html:
            `
                <p><i>Please click on following link to activate your account: </i><p>
                <a href="${process.env.CLIENT_URL}/user/activate?token=${token}&username=${username}&email=${email}"">
                    ${process.env.CLIENT_URL}/user/activate?token=${token}&username=${username}&email=${email}"
                </a>
            `
    }
    await mailSender.sendMail(mail)
    return SuccessResponse(res, { email, username }, "EMAIL_SENT", 201);
}
