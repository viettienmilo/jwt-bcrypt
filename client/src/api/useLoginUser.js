import { useMutation } from "@tanstack/react-query"
import { authAPI } from './axiosInstance';

const useLoginUser = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await authAPI.post('/auth/login', data);
            return response.data;
        },
    });
}

export default useLoginUser