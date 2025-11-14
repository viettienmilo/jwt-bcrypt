import { useMutation } from "@tanstack/react-query"
import { authAPI } from './axiosInstance';

const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await authAPI.post('/auth/forgot-password', data);
            return response.data;
        },
    });
}

export default useForgotPassword