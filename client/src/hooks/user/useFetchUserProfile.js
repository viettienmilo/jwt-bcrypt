import { useMutation } from "@tanstack/react-query"
import { fetchUserProfileService } from "@/services";

const useFetchUserProfile = () => {
    return useMutation({
        mutationFn: ({ accessToken }) => fetchUserProfileService(accessToken)
    });
}

export default useFetchUserProfile