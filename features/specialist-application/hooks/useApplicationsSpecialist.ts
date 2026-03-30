import { useMutation } from "@tanstack/react-query";
import { fetchApplicationsSpecialist } from "../api/fetchApplSpecialist";

export function useApplicationsSpecialist() {
    return useMutation({
        mutationFn: fetchApplicationsSpecialist,
    });
}