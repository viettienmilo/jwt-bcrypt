import { ErrorResponse, SuccessResponse } from '../../utils/response.js';
import { ERROR } from '../../constants/errorCodes.js';
import UserProfile from './../../models/UserProfile.js';

import axios from 'axios'

const fetchUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId  // set by authUserMiddleware

        const accessToken = req.headers.authorization?.split(' ')[1];

        // 1. Fetch user info from Auth Server
        const authResponse = await axios.get(
            `${process.env.AUTH_SERVER_URL}/api/auth/users/${userId}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );

        const { email, role } = authResponse.data;

        // get user profile
        const userProfile = await UserProfile.findById(userId);

        // merge local and auth server info
        const mergedUser = {
            ...userProfile.toObject(),
            email,
            role,
        };

        return SuccessResponse(res,
            {
                user: mergedUser
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