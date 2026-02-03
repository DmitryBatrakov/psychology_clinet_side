import { fetchOnboarding } from "../api/fetchOnboarding";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export  const completeOnboarding = async (payload: any) => {
    return fetchOnboarding(payload);
  };