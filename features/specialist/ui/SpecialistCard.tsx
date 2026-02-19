import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { SpecialistDTO } from "../model/types";
import Image from "next/image";
import { getServiceLabel } from "@/features/catalog/model/serviceTopics";
import { Button } from "@/components/ui/button";
import {
    GENDER_LABELS,
    LANGUAGE_LABELS,
    MEETING_FORMAT_LABELS,
    PROFESSION_LABELS,
    SESSION_TYPE_LABELS,
} from "../model/specialistLabels";
import { toast } from "sonner";

export const SpecialistCard = ({
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

    const servicesMid = Math.ceil(specialist.services.length / 2);
    const servicesLeft = specialist.services.slice(0, servicesMid);
    const servicesRight = specialist.services.slice(servicesMid);

    const onWaitlistClick = () => {
        toast("נוספת לרשימת ההמתנה.", {
            duration: 3000,
            position: "bottom-right",
        });
    };

    // <div className="flex h-full w-full items-center justify-center text-muted-foreground text-6xl">
    //     {specialist.firstName.charAt(0)}
    //     {specialist.lastName.charAt(0)}
    // </div>

    const fileIcon = "/assets/images/images.jpeg";

    return (
        <Card className="overflow-hidden">
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
                        <p><strong>ניסיון</strong>: {specialist.experience} שנים</p>
                        <p><strong>מחיר</strong>: ₪{specialist.pricePerSession} / פגישה</p>
                        <p><strong>מין</strong>: {gender}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 text-sm">
                        <p><strong>פורמט</strong>: {meetingFormat}</p>
                        <p className="md:col-span-2"><strong>שפות</strong>: {languages}</p>
                        {sessionTypesLabel ? (
                            <p className="md:col-span-2">
                                <strong>סוגי פגישה</strong>: {sessionTypesLabel}
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="font-semibold">Темы</h2>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <ul className="list-disc list-inside space-y-1">
                            {servicesLeft.map((service) => (
                                <li key={service}>
                                    {getServiceLabel(service)}
                                </li>
                            ))}
                        </ul>
                        <ul className="list-disc list-inside space-y-1">
                            {servicesRight.map((service) => (
                                <li key={service}>
                                    {getServiceLabel(service)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-end gap-3">
                <Button onClick={onWaitlistClick}>הצטרף לרשימת ההמתנה</Button>
            </CardFooter>
        </Card>
    );
};
