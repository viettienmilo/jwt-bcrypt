import { ErrorResponse } from "../utils/response.js";
import { ERROR } from "../constants/errorCodes.js";

/* Handles all remain errors if any*/

export function errorHandlerMiddleware(err, req, res, next) {
    console.error("Unhandled Error:", err);

    return ErrorResponse(res, ERROR.SERVER_ERROR, 500);
}