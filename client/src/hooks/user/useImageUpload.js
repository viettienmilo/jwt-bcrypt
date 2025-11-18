import { useMutation } from "@tanstack/react-query"
import { uploadProfilePitureService } from "@/services";

const useImageUpload = () => {

    return useMutation({
        mutationFn: (data) => uploadProfilePitureService(data)
    });
}

export default useImageUpload