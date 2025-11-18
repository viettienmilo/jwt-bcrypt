import { userAPI } from '../api/axiosInstance.js';
import { USER } from './../api/endpoints';
import { useUserStore } from './../store/useUserStore.js';

export async function createUserProfileService(data) {
    try {
        const response = await userAPI.post(
            USER.CREATE_PROFILE,
            data,
        )
        return response.data;
    } catch (error) {
        console.log("CREATE_PROFILE_ERROR: __ ", error.response?.data?.error || error.message);
        throw (error.response?.data || error);
    }
}

export async function fetchUserProfileService(accessToken) {
    try {
        const response = await userAPI.get(
            USER.PROFILE,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );
        return response.data;

    } catch (error) {
        console.log("USER_PROFILE_ERROR: __ ", error.response?.data?.error || error.message);
        throw (error.response?.data || error);
    }
}

export async function uploadProfilePitureService(data) {
    const accessToken = useUserStore.getState().accessToken;

    try {
        const response = await userAPI.post(
            USER.UPLOAD_PROFILE_PICTURE,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.log("UPLOAD_PROFILE_PICTURE_ERROR: __ ", error.response?.data?.error || error.message);
        throw (error.response?.data || error);
    }
}
