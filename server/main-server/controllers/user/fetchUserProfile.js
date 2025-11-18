import { ErrorResponse, SuccessResponse } from './../../utils/response.js';
import { ERROR } from './../../constants/errorCodes.js';
import UserProfile from './../../models/UserProfile.js';

const fetchUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId

        // send user back to client
        const user = await UserProfile.findById(userId);

        return SuccessResponse(res,
            {
                user
            },
            "FETCH_USER_SUCCESS",
            200
        );

    } catch (error) {
        console.log(error);
        ErrorResponse(res, ERROR.SERVER_ERROR, 500);
    }
}

export default fetchUserProfile;