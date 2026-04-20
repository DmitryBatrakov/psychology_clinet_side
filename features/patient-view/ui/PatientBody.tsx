import { useParams } from "next/navigation";
import { PatientHeader, PatientHeaderSkeleton } from "./PatientHeader";
import { PatientNextSession, PatientNextSessionSkeleton } from "./PatientNextSession";
import { PatientSessionHistory, PatientSessionHistorySkeleton } from "./PatientSessionHistory";
import { PatientStats, PatientStatsSkeleton } from "./PatientStats";
import { usePatientView } from "../hooks/usePatientView";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PatientBody() {


    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = usePatientView(id);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-5 mx-auto w-full">
                <PatientHeaderSkeleton />
                <PatientStatsSkeleton />
                <PatientNextSessionSkeleton />
                <PatientSessionHistorySkeleton />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center min-h-[50vh]">
                <span className="text-base text-muted-foreground text-center py-4">
                    המטופל לא נמצא
                </span>
                <Button>
                    <Link href="/dashboard">חזרה לדשבורד</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 w-full">
            <Link
                href="/dashboard"
                className="flex items-center w-full justify-start cursor-pointer hover:brightness-85 duration-300 transform-color"
            >
                <Badge className="text-sm font-semibold gap-3 text-foreground px-3 py-1">
                    <MoveRight size={20} />
                    <span>חזרה</span>
                </Badge>
            </Link>
            <PatientHeader patient={data.patient} />
            <PatientStats sessions={data.sessions} />
            <PatientNextSession sessions={data.sessions} />
            <PatientSessionHistory sessions={data.sessions} />
        </div>
    )
}