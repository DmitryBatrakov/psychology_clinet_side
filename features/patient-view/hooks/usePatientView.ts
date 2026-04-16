import { useQuery } from "@tanstack/react-query";
import type { PatientViewResponse } from "@/features/patient-view/model/types";
import { patientViewMock } from "@/features/patient-view/mockData/patientViewMock";

export const usePatientView = (patientId: string) => {
    return useQuery<PatientViewResponse>({
        queryKey: ["patient-view", patientId],
        queryFn: () => Promise.resolve(patientViewMock),
        enabled: !!patientId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
