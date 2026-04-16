import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleUser, Phone } from "lucide-react";
import type { PatientViewPatient } from "@/features/patient-view/model/types";
import type { Languages } from "@/features/user/model/types";

const GENDER_LABEL = { male: "זכר", female: "נקבה" } as const;

const LANGUAGE_LABEL: Record<Languages, string> = {
    he: "עברית",
    ru: "רוסית",
    en: "אנגלית",
    ar: "ערבית",
};

function calcAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

type PatientHeaderProps = {
    patient: PatientViewPatient;
};

export function PatientHeader({ patient }: PatientHeaderProps) {
    const fullName = `${patient.firstName} ${patient.lastName}`.trim();
    const initials = `${patient.firstName[0] ?? ""}${patient.lastName[0] ?? ""}`.toUpperCase();
    const age = patient.birthDate ? calcAge(patient.birthDate) : null;

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
                    <p className="text-muted-foreground text-sm">
                        {GENDER_LABEL[patient.gender]}
                        {age !== null && ` · בן/בת ${age}`}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {patient.languages.map((lang) => (
                        <Badge key={lang} variant="secondary">
                            {LANGUAGE_LABEL[lang]}
                        </Badge>
                    ))}
                </div>

                {patient.phoneNumber && (
                    <a
                        href={`tel:${patient.phoneNumber}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors justify-center sm:justify-start"
                        dir="ltr"
                    >
                        <Phone size={14} />
                        {patient.phoneNumber}
                    </a>
                )}
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
