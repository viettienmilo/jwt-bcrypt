import axios from "axios";
import { useUserStore } from "../store/useUserStore";
import { AUTH } from './endpoints.js';
/*
    1. Every API call uses the access token in the Authorization header.
    2. When that token expires, the backend returns 401 Unauthorized.
    3. The Axios interceptor catches that response.
    4. It automatically sends a refresh token request (/auth/refresh) using the cookie or stored refresh token.
    5. If successful, it updates the stored access token, retries the failed request, and continues normally — user never notices.
    6. If refresh fails (refresh token expired / revoked), it logs the user out.
*/

// Attach interceptors to any Axios instance
export const attachAuthInterceptors = (axiosInstance) => {
    // Attach Authorization header to every request
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = useUserStore.getState().accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Attach response interceptor to handle 401 + refresh
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshResponse = await axios.post(
                        `${import.meta.env.VITE_AUTH_API}${AUTH.REFRESH_TOKEN}`,
                        {},
                        { withCredentials: true }
                    );
                    const newAccessToken = refreshResponse.data.data.accessToken;

                    useUserStore.getState().setAccessToken(newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    useUserStore.getState().logout();
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
};






//////////////////////////////////////////////////////////
const authAPI = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API,
    withCredentials: true, // needed for sending cookies
    headers: {
        "Content-Type": "application/json"
    }
});

//////////////////////////////////////////////////////////
const userAPI = axios.create({
    baseURL: import.meta.env.VITE_MAIN_API,
    withCredentials: true,
});


//////////////////////////////////////////////////////////
const adminAPI = axios.create({
    baseURL: import.meta.env.VITE_MAIN_API_ADMIN, // http://localhost:3000/api/admin
    withCredentials: true,
});


attachAuthInterceptors(authAPI);
attachAuthInterceptors(userAPI);
attachAuthInterceptors(adminAPI);

export { authAPI, userAPI, adminAPI };