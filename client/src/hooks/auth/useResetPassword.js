import { useMutation } from "@tanstack/react-query"
import { resetPasswordService } from "@/services";

const useResetPassword = () => {
    return useMutation({
        mutationFn: resetPasswordService,
    });
}

export default useResetPassword