import { useQuery } from "@tanstack/react-query"
import { fetchUserProfileService } from "@/services";

const useFetchUserProfile = (enabled = true) => {
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUserProfileService,
        enabled
    });
}

export default useFetchUserProfile
