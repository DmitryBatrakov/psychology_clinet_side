import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { SpecialistDTO } from "../model/types";
import Image from "next/image";
import {
    GENDER_LABELS,
    LANGUAGE_LABELS,
    MEETING_FORMAT_LABELS,
    PROFESSION_LABELS,
    SESSION_TYPE_LABELS,
} from "../model/specialistLabels";


export const SpecialistOverviewCard = ({
    specialist,
}: {
    specialist: SpecialistDTO;
}) => {
    const fullName = `${specialist.firstName} ${specialist.lastName}`;

    const profession =
        PROFESSION_LABELS[specialist.profession] ?? specialist.profession;

    const languages = specialist.languages
        .map((lang) => LANGUAGE_LABELS[lang] ?? lang)
        .join(", ");

    const meetingFormat =
        MEETING_FORMAT_LABELS[specialist.meetingFormat] ??
        specialist.meetingFormat;

    const gender = GENDER_LABELS[specialist.gender] ?? specialist.gender;

    const sessionTypesLabel =
        specialist.sessionTypes
            ?.map((t) => SESSION_TYPE_LABELS[t] ?? t)
            .join(", ") ?? "";


    const fileIcon = "/assets/images/images.jpeg";

    return (
        <Card className="overflow-hidden w-full">
            <CardHeader className="p-0">
                <div className="  h-full  w-full flex items-center justify-center ">
                    {specialist.photoUrl ? (
                        <div className="relative flex items-center justify-center text-muted-foreground text-4xl w-72 h-72 rounded-full overflow-hidden ">
                            <Image
                                src={specialist.photoUrl}
                                alt={"photo"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    ) : (
                        <div className="relative flex items-center justify-center text-muted-foreground text-4xl w-72 h-72 rounded-full overflow-hidden ">
                            <Image
                                src={fileIcon}
                                alt={"photo not found"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-right">
                <div>
                    <h1 className="text-2xl font-bold">{fullName}</h1>
                    <p className="text-muted-foreground">{profession}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="grid grid-cols-1  gap-3 text-sm">
                        <p>
                            <strong>ניסיון</strong>: {specialist.experience}{" "}
                            שנים
                        </p>
                        <p>
                            <strong>מחיר</strong>: ₪{specialist.pricePerSession}{" "}
                            / פגישה
                        </p>
                        <p>
                            <strong>מין</strong>: {gender}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 text-sm">
                        <p>
                            <strong>פורמט</strong>: {meetingFormat}
                        </p>
                        <p className="md:col-span-2">
                            <strong>שפות</strong>: {languages}
                        </p>
                        {sessionTypesLabel ? (
                            <p className="md:col-span-2">
                                <strong>סוגי פגישה</strong>: {sessionTypesLabel}
                            </p>
                        ) : null}
                    </div>
                </div>

              
            </CardContent>
        </Card>
    );
};
