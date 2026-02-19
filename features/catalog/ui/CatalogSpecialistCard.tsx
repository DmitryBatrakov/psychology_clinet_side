"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import type { SpecialistDTO } from "@/features/specialist/model/types";
import { SESSION_TYPE_LABELS } from "@/features/specialist/model/specialistLabels";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PROFESSION_LABELS: Record<SpecialistDTO["profession"], string> = {
    psychologist: "פסיכולוג/ית",
    therapist: "פסיכותרפיסט/ת",
    coach: " מאמן/ת אישי",
};

interface CatalogSpecialistCardProps {
    specialist: SpecialistDTO;
}

export function CatalogSpecialistCard({
    specialist,
}: CatalogSpecialistCardProps) {
    const name = `${specialist.firstName} ${specialist.lastName}`;
    const professionLabel = PROFESSION_LABELS[specialist.profession];
    const router = useRouter();

    console.log(specialist.id);

    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="relative aspect-4/3 w-full bg-muted">
                    {specialist.photoUrl ? (
                        <Image
                            src={specialist.photoUrl}
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground text-4xl">
                            {specialist.firstName.charAt(0)}
                            {specialist.lastName.charAt(0)}
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-1">
                <p className="font-semibold text-right" dir="rtl">
                    {name}
                </p>
                <p
                    className="text-sm text-muted-foreground text-right"
                    dir="rtl"
                >
                    {professionLabel}
                </p>
                <p className="text-sm text-muted-foreground text-right">
                    ניסיון: {specialist.experience} שנים
                </p>
                {specialist.sessionTypes?.length ? (
                    <p className="text-xs text-muted-foreground text-right">
                        {specialist.sessionTypes.map((t) => SESSION_TYPE_LABELS[t] ?? t).join(" • ")}
                    </p>
                ) : null}
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end">
                <div className="flex items-center justify-between w-full gap-2">
                    <span className="font-medium text-lg">
                        מ- {specialist.pricePerSession} ₪
                    </span>
                    <Button
                        variant="default"
                        onClick={() =>
                            router.push(`/specialist/${specialist.id}`)
                        }
                    >
                        View Profile
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
