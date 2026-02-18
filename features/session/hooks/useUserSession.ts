import { useQuery } from "@tanstack/react-query";
import { sessionData } from "@/mockData/sessions/sessionData";
import { SessionDTO } from "../model/types";


export const useUserSession = (uid: string | null, authLoading: boolean) => {
  return useQuery<SessionDTO[]>({
    queryKey: ["sessions", uid],
    queryFn: async () => sessionData, 
    enabled: !authLoading && !!uid,
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 30,
    // retry: 1,
  });
};