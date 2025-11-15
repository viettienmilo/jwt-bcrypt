import { useMutation } from "@tanstack/react-query"
import { loginService } from "@/services";

const useLoginUser = () => {
    return useMutation({
        mutationFn: loginService,
    });
}

export default useLoginUser