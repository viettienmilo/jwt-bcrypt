import { useMutation } from "@tanstack/react-query"
import { sendActivationLinkService } from "@/services";

const useSendActivationLink = () => {
    return useMutation({
        mutationFn: sendActivationLinkService,
    });
}

export default useSendActivationLink