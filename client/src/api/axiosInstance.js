import axios from "axios";
import { useUserStore } from "../store/useUserStore";

/*
    1. Every API call uses the access token in the Authorization header.
    2. When that token expires, the backend returns 401 Unauthorized.
    3. The Axios interceptor catches that response.
    4. It automatically sends a refresh token request (/auth/refresh) using the cookie or stored refresh token.
    5. If successful, it updates the stored access token, retries the failed request, and continues normally — user never notices.
    6. If refresh fails (refresh token expired / revoked), it logs the user out.
*/

const API = axios.create({
    baseURL: import.meta.env.VITE_MAIN_API,
    withCredentials: true, // needed for sending cookies
});

// Attach access token to all requests
API.interceptors.request.use((config) => {
    const token = useUserStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 responses automatically
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // if access token expired and not retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // ask for new access token from auth server
                const refreshResponse = await axios.post(
                    `${import.meta.env.VITE_AUTH_API}/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = refreshResponse.data.accessToken;
                useUserStore.getState().setAccessToken(newAccessToken);

                // retry the failed request with new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                // refresh token invalid — logout
                useUserStore.getState().logout();
            }
        }

        return Promise.reject(error);
    }
);

export default API;