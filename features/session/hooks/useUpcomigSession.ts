import { useQuery } from "@tanstack/react-query";
import { sessionData } from "@/mockData/sessions/sessionData";
import { SessionDTO } from "../model/types";
import { fetchUpcomingSession } from "@/features/user/api/fetchUpcomigSession";


export const useUpcomingSession = (uid: string | null, authLoading: boolean) => {
  return useQuery<SessionDTO[]>({
    queryKey: ["upcoming-session", uid],
    queryFn: async () => fetchUpcomingSession(), 
    enabled: !authLoading && !!uid,
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 30,
    // retry: 1,
  });
};