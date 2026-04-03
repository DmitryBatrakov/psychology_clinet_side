import type { SpecialistDTO } from "@/features/specialist/model/types";

export type SpecialistDetailsDTO = SpecialistDTO & {
    serviceLabels: Record<string, string>;
};

export async function fetchSpecialistById(
    id: string
): Promise<SpecialistDetailsDTO | null> {
    const res = await fetch(`/api/catalog/specialists/${id}`);
    if (res.status === 404) {
        return null;
    }

    const json = await res.json().catch(() => null);
    if (!res.ok) {
        throw new Error(json?.error ?? "Failed to load specialist");
    }

    if (!json) {
        throw new Error("Invalid response format");
    }

    return json as SpecialistDetailsDTO;
}
