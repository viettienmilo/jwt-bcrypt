import { authAPI } from './../api/axiosInstance';

export default async function logoutService() {
    try {
        await authAPI.post('/auth/logout');
    } catch (error) {
        console.log(error);
    }
}