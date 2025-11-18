import crypto from 'crypto'
import ResetPasswordToken from './../models/ResetPasswordToken.js';
import AuthUser from './../models/AuthUser.js';
import { forgotPasswordEmailSchema } from './../validations/authValidations.js';
import mailSender from './../configs/nodemailer.js';
import { ErrorResponse, SuccessResponse } from './../utils/response.js';
import { ERROR } from './../constants/errorCodes.js';

export default async function forgotPassword(req, res) {
    try {
        const { error, value } = forgotPasswordEmailSchema.validate(req.body);
        if (error)
            return ErrorResponse(res, ERROR.VALIDATION_ERROR, 400, error.details[0].message);

        const { email } = value;
        const user = await AuthUser.findOne({ email });
        if (!user)
            return ErrorResponse(res, ERROR.USER_NOT_FOUND, 403);
        if (!user.isVerified)
            return ErrorResponse(res, ERROR.ACCOUNT_NOT_VERIFIED, 403);

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

        return SuccessResponse(res, null, "EMAIL_SENT", 201);
    } catch (error) {
        console.log(error);
        ErrorResponse(res, ERROR.SERVER_ERROR, 500);
    }
}