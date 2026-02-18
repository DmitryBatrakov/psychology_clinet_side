"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import type { SpecialistDTO } from "@/features/specialist/model/types";
import { getServiceLabel } from "@/features/catalog/model/serviceTopics";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
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
                {specialist.services.length > 0 && (
                    <p
                        className="text-xs text-muted-foreground text-right truncate"
                        dir="rtl"
                    >
                        {specialist.services
                            .slice(0, 2)
                            .map(getServiceLabel)
                            .join(" • ")}
                    </p>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end">
                <div className="flex items-center justify-between w-full gap-2">
                    <span className="font-medium">
                        ₪{specialist.pricePerSession}
                        <span className="text-muted-foreground text-sm font-normal">
                            {" "}
                            / פגישה
                        </span>
                    </span>
                    <Button variant="default" onClick={() => router.push(`/specialist/${specialist.id}`)}>
                        View Profile
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
