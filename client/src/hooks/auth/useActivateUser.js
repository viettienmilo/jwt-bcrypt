import { useMutation } from "@tanstack/react-query"
import { activateService } from "@/services";

const useActivateUser = () => {
    return useMutation({
        mutationFn: ({ token, username }) => activateService(token, username),
    });
}

export default useActivateUser