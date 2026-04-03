import type { SessionDTO } from "@/features/session/model/types";
import type { ScheduleOverride, ScheduleRule } from "@/features/slot/model/type";

export type SpecialistScheduleResponse = {
    rule: ScheduleRule | null;
    overrides: ScheduleOverride[];
    sessions: SessionDTO[];
};

export async function fetchSpecialistSchedule(
    specialistId: string
): Promise<SpecialistScheduleResponse> {
    const params = new URLSearchParams({ specialistId });
    const res = await fetch(`/api/slot/specialist-schedule?${params.toString()}`);
    const json = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(json?.error ?? "Failed to load specialist schedule");
    }
    if (!json) {
        throw new Error("Invalid response format");
    }

    return json as SpecialistScheduleResponse;
}
