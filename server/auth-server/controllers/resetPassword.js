import ResetPasswordToken from './../models/ResetPasswordToken.js';
import User from './../models/User.js';
import bcrypt from 'bcrypt';
import { ErrorResponse, SuccessResponse } from './../utils/response.js';
import { ERROR } from './../constants/errorCodes.js';

export default async function resetPassword(req, res) {
    const { token, password } = req.body;

    if (!token)
        return ErrorResponse(res, ERROR.INVALID_TOKEN, 401);

    const record = await ResetPasswordToken.findOne({ token });
    if (!record)
        return ErrorResponse(res, ERROR.INVALID_TOKEN, 401);

    if (record.expiresAt < Date.now()) {
        await record.deleteOne();
        return ErrorResponse(res, ERROR.TOKEN_EXPIRED, 401);
    }

    const user = await User.findById(record.userId);
    if (!user)
        return ErrorResponse(res, ERROR.USER_NOT_FOUND, 403);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    await user.save();

    return SuccessResponse(res, null, "RESET_PASSWORD_SUCCESS", 200);
}