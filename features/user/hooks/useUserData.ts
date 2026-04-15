"use client";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "../model/types";
import { fetchUserData } from "../api/fetchUserData";
import { userProfile } from "@/mockData/user/userData";

export const useUserData = (uid: string | null, authLoading: boolean) => {
    return useQuery<UserProfile>({
        queryKey: ["user", uid],
        queryFn: () => Promise.resolve(userProfile),
        // queryFn: fetchUserData,
        enabled: !authLoading && !!uid,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
};




