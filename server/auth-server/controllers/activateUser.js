import ActivationToken from './../models/ActivationToken.js';
import User from './../models/User.js';
import { ErrorResponse, SuccessResponse } from './../utils/response.js';
import { ERROR } from './../constants/errorCodes.js';
import crypto from 'crypto'

export default async function activateUser(req, res) {
    const { token } = req.body;
    if (!token)
        return ErrorResponse(res, ERROR.INVALID_TOKEN, 403);

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const record = await ActivationToken.findOne({ token: hashedToken });
    if (!record)
        return ErrorResponse(res, ERROR.INVALID_TOKEN, 403);

    if (record.expiresAt < Date.now()) {
        await record.deleteOne();
        return ErrorResponse(res, ERROR.TOKEN_EXPIRED, 403);
    }

    const user = await User.findById(record.userId);
    if (!user)
        return ErrorResponse(res, ERROR.USER_NOT_FOUND, 403);

    user.isVerified = true;
    await user.save();
    await record.deleteOne();

    return SuccessResponse(res, { userId: user._id }, "ACCOUNT_ACTIVATED", 200);
}