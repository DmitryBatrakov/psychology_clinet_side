"use client";

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
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function PatientViewPage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = usePatientView(id);

    console.log(data?.patient.id);
    

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
        <div className="flex flex-col gap-5 p-5 max-w-6xl mx-auto w-full">
            <div className="w-full flex items-center justify-start gap-2">
                <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 text-primary "
                >
                    <MoveRight size={20} />
                    <span>חזרה</span>
                </Link>
            </div>
            <PatientHeader patient={data.patient} />
            <PatientStats sessions={data.sessions} />
            <PatientNextSession sessions={data.sessions} />
            <PatientSessionHistory sessions={data.sessions} />
        </div>
    );
}
