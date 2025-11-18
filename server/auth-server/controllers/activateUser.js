import ActivationToken from './../models/ActivationToken.js';
import AuthUser from './../models/AuthUser.js';
import { ErrorResponse, SuccessResponse } from './../utils/response.js';
import { ERROR } from './../constants/errorCodes.js';
import crypto from 'crypto'

export default async function activateUser(req, res) {
    const { token, username } = req.query;

    if (!token)
        return ErrorResponse(res, ERROR.INVALID_TOKEN, 403);

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const record = await ActivationToken.findOne({ token: hashedToken });
    if (!record)
        return ErrorResponse(res, ERROR.INVALID_TOKEN, 401);

    if (record.expiresAt < Date.now()) {
        await record.deleteOne();
        return ErrorResponse(res, ERROR.TOKEN_EXPIRED, 402);
    }

    const user = await AuthUser.findById(record.userId);
    if (!user)
        return ErrorResponse(res, ERROR.USER_NOT_FOUND, 404);

    user.isVerified = true;
    await user.save();
    await record.deleteOne();

    return SuccessResponse(res, { userId: user._id, username }, "ACCOUNT_ACTIVATED", 200);
}

// const { token } = req.body;