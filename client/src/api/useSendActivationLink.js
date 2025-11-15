import { useMutation } from "@tanstack/react-query"
import { authAPI } from './axiosInstance';

const useSendActivationLink = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await authAPI.post('/auth/send-activation-link', data);
            return response.data;
        },
    });
}

export default useSendActivationLink