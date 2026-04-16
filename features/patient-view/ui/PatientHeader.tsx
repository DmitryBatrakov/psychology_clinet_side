import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleUser } from "lucide-react";
import type { PatientViewPatient } from "@/features/patient-view/model/types";
import { calculateAge } from "@/lib/func/calculate-age/calculateAge";
import { GENDER_LABELS, LANGUAGE_LABELS } from "@/lib/labels";

type PatientHeaderProps = {
    patient: PatientViewPatient;
};

export function PatientHeader({ patient }: PatientHeaderProps) {
    const fullName = `${patient.firstName} ${patient.lastName}`.trim();
    const initials = `${patient.firstName[0] ?? ""}${patient.lastName[0] ?? ""}`.toUpperCase();
    const age = patient.birthDate ? calculateAge(patient.birthDate) : null;

    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-6 bg-card rounded-2xl border">
            <Avatar className="w-24 h-24 shrink-0">
                <AvatarImage src={patient.photoUrl ?? undefined} alt={fullName} />
                <AvatarFallback className="text-2xl">
                    {initials || <CircleUser size={40} />}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-3 text-center sm:text-right flex-1">
                <div>
                    <h1 className="text-2xl font-bold">{fullName}</h1>
                    <div className="text-muted-foreground text-sm flex gap-2">
                        {age && <span>גיל {age}</span>}
                        {age && <span>·</span>}
                        <span>{GENDER_LABELS[patient.gender]}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {patient.languages.map((lang) => (
                        <Badge key={lang} variant="secondary">
                            {LANGUAGE_LABELS[lang]}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function PatientHeaderSkeleton() {
    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-6 bg-card rounded-2xl border">
            <Skeleton className="w-24 h-24 rounded-full shrink-0" />
            <div className="flex flex-col gap-3 flex-1">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-24" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
    );
}
