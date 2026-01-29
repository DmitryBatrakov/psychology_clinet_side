'use client'
import { fetchUserData } from "@/features/user/api";
import { Gender, Languages } from "@/features/user/types";

import { useQuery } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";

export type UserProfile = {
  uid: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Timestamp;
  gender: Gender;
  languages: Languages[];
  photoUrl: string | null;
  balance: number;
  profileComplete: boolean;
};

export const useUserData = ( uid: string | null,  authLoading: boolean) => {
    return useQuery<UserProfile>({
    queryKey: ["user", uid],
    queryFn: fetchUserData,
    enabled: !authLoading && !!uid, 
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });
};
