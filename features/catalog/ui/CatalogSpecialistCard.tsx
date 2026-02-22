"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import type { SpecialistDTO } from "@/features/specialist/model/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CatalogLanguage } from "../model/catalogEnums";

const PROFESSION_LABELS: Record<SpecialistDTO["profession"], string> = {
    psychologist: "פסיכולוג/ית",
    therapist: "פסיכותרפיסט/ת",
    coach: " מאמן/ת אישי",
};

const LANGUAGE_LABELS: Record<CatalogLanguage, string> = {
    he: "עברית",
    ru: "רוסית",
    en: "אנגלית",
    uk: "אוקראינית",
    ar: "ערבית",
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
    const languagesLabel = specialist.languages
        .map((lang) => LANGUAGE_LABELS[lang])
        .join(", ");

    console.log(specialist.id);
    const fileIcon = '/assets/images/images.jpeg';

    return (
        <Card className="overflow-hidden ">
            <CardHeader className="p-0">
                <div className="relative flex itwems-center justify-center w-full h-full">
                    {specialist.photoUrl ? (
                        <div className="relative flex items-center justify-center text-muted-foreground text-4xl w-56 h-56 rounded-full overflow-hidden ">
                            <Image
                                src={specialist.photoUrl}
                                alt={name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    ) : (
                        <div className="relative flex items-center justify-center text-muted-foreground text-4xl w-56 h-56 rounded-full overflow-hidden ">
                            <Image
                                src={fileIcon}
                                alt={name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
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
                <p className="text-sm text-muted-foreground text-right">
                    {languagesLabel}
                </p>
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
