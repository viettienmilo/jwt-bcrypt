import { useMutation } from "@tanstack/react-query"
import { authAPI } from './axiosInstance';

const useRegisterUser = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await authAPI.post('/auth/register', data);
            return response.data;
        },
    });
}

export default useRegisterUser