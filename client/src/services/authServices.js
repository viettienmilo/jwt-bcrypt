import { authAPI } from '../api/axiosInstance';
import { AUTH } from './../api/endpoints';

export async function registerService(data) {
    try {
        const response = await authAPI.post(AUTH.REGISTER, data);
        return response.data;
    } catch (error) {
        console.log("REGISTER_ERROR: __ ", error.response?.data || error.message);
        throw error;
    }
}

export async function sendActivationLinkService(data) {
    try {
        const response = await authAPI.post(AUTH.SEND_ACTIVATION_LINK, data);
        return response.data;
    } catch (error) {
        console.log("SEND_ACTIVATION_LINK_ERROR: __ ", error.response?.data || error.message);
        throw error;
    }
}

export async function activateService(token) {
    try {
        const response = await authAPI.get(AUTH.ACTIVATE, {
            params: { token },
        });
        return response.data;
    } catch (error) {
        console.log("ACTIVATE_ERROR: __ ", error.response?.data || error.message);
        throw error;
    }
}

export async function loginService(data) {
    try {
        const response = await authAPI.post(AUTH.LOGIN, data);
        return response.data;
    } catch (error) {
        console.log("LOG_IN_ERROR: __ ", error.response?.data || error.message);
        throw error;
    }
}

export async function logoutService() {
    try {
        await authAPI.post(AUTH.LOGOUT);
    } catch (error) {
        console.log("LOG_OUT_ERROR: __ ", error.message);
        throw error;
    }
}

export async function forgotPasswordService(data) {
    try {
        const response = await authAPI.post(AUTH.FORGOT_PASSWORD, data);
        return response.data;
    } catch (error) {
        console.log("FORGOT_PASSWORD_ERROR: __ ", error.response?.data || error.message);
        throw error;
    }
}

export async function resetPasswordService(data) {
    try {
        const response = await authAPI.post(AUTH.RESET_PASSWORD, data);
        return response.data;
    } catch (error) {
        console.log("RESET_PASSWORD_ERROR: __ ", error.response?.data || error.message);
        throw error;
    }
}