import { useMutation } from "@tanstack/react-query"
import { uploadProfilePitureService } from "@/services";

const useImageUpload = () => {
    return useMutation({
        mutationFn: uploadProfilePitureService
    });
}

export default useImageUpload