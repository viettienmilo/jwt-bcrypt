import { useMutation } from "@tanstack/react-query"
import { createUserProfileService } from "@/services";

const useCreateUserProfile = () => {
    return useMutation({
        mutationFn: createUserProfileService
    });
}

export default useCreateUserProfile