import { useQuery } from "@tanstack/react-query";
import type { PatientViewResponse } from "@/features/patient-view/model/types";
import { getPatientViewMock } from "@/features/patient-view/mockData/patientViewMock";
// import { fetchPatientView } from "@/features/patient-view/api/fetchPatientView";

export const usePatientView = (patientId: string) => {
    return useQuery<PatientViewResponse | null>({
        queryKey: ["patient-view", patientId],
        queryFn: () => Promise.resolve(getPatientViewMock(patientId)),
        // queryFn: () => fetchPatientView(patientId),
        enabled: !!patientId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
};
