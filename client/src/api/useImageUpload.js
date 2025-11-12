import { useMutation } from "@tanstack/react-query"
import { authAPI } from './axiosInstance';

const useImageUpload = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await authAPI.post(
                '/upload/profile-picture',
                data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
    });
}

export default useImageUpload