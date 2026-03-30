import { SpecialistApplicationCreateInput } from "../model/types";

export const fetchApplicationsSpecialist = async (
    data: SpecialistApplicationCreateInput,
) => {

    console.log("data ffrom fetcn", data);
    
    const res = await fetch("/api/specialist-application", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => {});
    if (!res.ok) throw new Error(json?.error ?? "Failed to submit application");

    return json;
};
