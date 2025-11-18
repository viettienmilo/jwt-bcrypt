import { useMutation } from "@tanstack/react-query"
import { forgotPasswordService } from "@/services";

const useForgotPassword = () => {
    return useMutation({
        mutationFn: forgotPasswordService,
    });
}

export default useForgotPassword