import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../api/updateUserProfile";

export const useUpdateUserProfile = (uid: string | null) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: updateUserProfile,
      onSuccess: () => {
        if (uid) {
          queryClient.refetchQueries({ queryKey: ["user", uid] });
        }
      },
    });
  };