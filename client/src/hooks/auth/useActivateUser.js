import { useMutation } from "@tanstack/react-query"
import { activateService } from "@/services";

const useActivateUser = () => {
    return useMutation({
        mutationFn: ({ token }) => activateService(token),
    });
}

export default useActivateUser