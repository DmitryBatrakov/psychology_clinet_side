import { UserData } from "@/features/user/model/types";
import { fetchOnboarding } from "../api/fetchOnboarding";


export  const completeOnboarding = async (payload: UserData) => {
    return fetchOnboarding(payload);
  };