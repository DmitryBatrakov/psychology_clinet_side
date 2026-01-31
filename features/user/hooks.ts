"use client";
import { fetchUserData } from "@/features/user/api";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "./types";

export const useUserData = (uid: string | null, authLoading: boolean) => {
    return useQuery<UserProfile>({
        queryKey: ["user", uid],
        queryFn: fetchUserData,
        enabled: !authLoading && !!uid,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
    });
};


// export const useUpdateUserProfile = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: updateUserProfile,
//         onSuccess: (updatedData) => {
//             // Обновляем кеш React Query
//             queryClient.setQueryData(["user", updatedData.uid], updatedData);
            
//             // Или можно инвалидировать, чтобы перезагрузить данные
//             // queryClient.invalidateQueries({ queryKey: ["user"] });
//         },
//         onError: (error: Error) => {
//             console.error("Failed to update profile:", error.message);
//         },
//     });
// };