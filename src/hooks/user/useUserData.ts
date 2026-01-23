'use client'
import { fetchDbUser } from "@/src/api/user/user";
import { useQuery } from "@tanstack/react-query";

export const useUserData = (uid?: string) => {
    return useQuery({
        queryKey: ["dbUser", uid],
        queryFn: () => fetchDbUser(uid!),
        enabled: !!uid,
        staleTime: 1000 * 60 * 5, 
        gcTime: 1000 * 60 * 30, 
    });
};
