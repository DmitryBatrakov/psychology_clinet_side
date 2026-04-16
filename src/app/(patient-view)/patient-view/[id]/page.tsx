'use client'

import { useParams } from "next/navigation";
import { usePatientView } from "@/features/patient-view/hooks/usePatientView";
import {
    PatientHeader,
    PatientHeaderSkeleton,
} from "@/features/patient-view/ui/PatientHeader";
import {
    PatientStats,
    PatientStatsSkeleton,
} from "@/features/patient-view/ui/PatientStats";
import {
    PatientNextSession,
    PatientNextSessionSkeleton,
} from "@/features/patient-view/ui/PatientNextSession";
import {
    PatientSessionHistory,
    PatientSessionHistorySkeleton,
} from "@/features/patient-view/ui/PatientSessionHistory";

export default function PatientViewPage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = usePatientView(id);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-5 p-5 max-w-4xl mx-auto w-full">
                <PatientHeaderSkeleton />
                <PatientStatsSkeleton />
                <PatientNextSessionSkeleton />
                <PatientSessionHistorySkeleton />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-muted-foreground">המטופל לא נמצא</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 p-5 max-w-4xl mx-auto w-full">
            <PatientHeader patient={data.patient} />
            <PatientStats sessions={data.sessions} />
            <PatientNextSession sessions={data.sessions} />
            <PatientSessionHistory sessions={data.sessions} />
        </div>
    );
}
