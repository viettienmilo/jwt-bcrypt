import { useMutation } from "@tanstack/react-query"
import { registerService } from "@/services";

const useRegisterUser = () => {
    return useMutation({
        mutationFn: registerService,
    });
}

export default useRegisterUser