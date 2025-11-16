import { ErrorResponse, SuccessResponse } from '../../utils/response.js';
import { ERROR } from '../../constants/errorCodes.js';

const fetchUserProfile = async (req, res) => {
    try {
        const user = req.user

        // send user back to client
        return SuccessResponse(res,
            {
                user: {
                    userId: user._id,
                    ...user.toObject(),
                }
            },
            "GET_USER_SUCCESS",
            200
        );

    } catch (error) {
        console.log(error);
        ErrorResponse(res, ERROR.SERVER_ERROR, 500);
    }
}

export default fetchUserProfile;