import { useMutation } from "@tanstack/react-query"
import { authAPI } from './axiosInstance';

const useActivateUser = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await authAPI.post('/auth/activate', data);
            return response.data;
        },
    });
}

export default useActivateUser