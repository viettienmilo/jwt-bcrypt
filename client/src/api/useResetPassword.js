import { useMutation } from "@tanstack/react-query"
import { authAPI } from './axiosInstance';

const useResetPassword = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await authAPI.post('/auth/reset-password', data);
            return response.data;
        },
    });
}

export default useResetPassword