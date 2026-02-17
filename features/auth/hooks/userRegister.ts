import { registerUser } from "../api/registerUser";
import { ApiError } from "@/lib/api-error";
import { RegisterCredentials } from "../model/types";
import { useMutation } from "@tanstack/react-query";


export const useRegister = () => {
    return useMutation<unknown, ApiError, RegisterCredentials>({
        mutationFn: ({ email, password }) => registerUser(email, password),
    });
};
