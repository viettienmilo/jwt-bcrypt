/*
    standard form for backend's
*/

export const SuccessResponse = (res, data = {}, code = null, status = 200) => {
    return res.status(status).json({
        success: true,
        code,
        data
    });
};

export const ErrorResponse = (res, errorCode, status = 400, details = null) => {
    return res.status(status).json({
        success: false,
        error: errorCode,
        details
    });
};