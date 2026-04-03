"use client";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "../model/types";
import { fetchUserData } from "../api/fetchUserData";

export const useUserData = (uid: string | null, authLoading: boolean) => {
    return useQuery<UserProfile>({
        queryKey: ["user", uid],
        queryFn: fetchUserData,
        enabled: !authLoading && !!uid,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
};




