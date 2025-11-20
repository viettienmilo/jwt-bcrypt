import { useMutation } from "@tanstack/react-query"
import { updateUserProfileService } from "@/services";

const useCreateUserProfile = () => {
    return useMutation({
        mutationFn: updateUserProfileService
    });
}

export default useCreateUserProfile