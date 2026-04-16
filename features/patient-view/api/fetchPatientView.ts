import { auth } from "@/lib/firebase";
import type { PatientViewResponse } from "@/features/patient-view/model/types";

export async function fetchPatientView(
    patientId: string
): Promise<PatientViewResponse | null> {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User not authenticated");
    }

    const idToken = await user.getIdToken();

    const res = await fetch(`/api/specialist/patients/${patientId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });

    if (res.status === 404) {
        return null;
    }

    const json = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(json?.error ?? "Failed to load patient");
    }

    if (!json) {
        throw new Error("Invalid response format");
    }

    return json as PatientViewResponse;
}
