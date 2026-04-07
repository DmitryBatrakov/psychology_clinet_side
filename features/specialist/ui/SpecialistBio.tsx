import { SpecialistDTO } from "../model/types";
import Image from "next/image";
import {
    GENDER_LABELS,
    LANGUAGE_LABELS,
    PROFESSION_LABELS,
} from "../model/specialistLabels";

const getAgeFromBirthDate = (birthDate: string): number | null => {
    const date = new Date(birthDate);
    if (Number.isNaN(date.getTime())) return null;

    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    const hadBirthdayThisYear =
        now.getMonth() > date.getMonth() ||
        (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());

    if (!hadBirthdayThisYear) age -= 1;
    if (age < 0) return null;

    return age;
};

export const SpecialistBio = ({
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

    const gender = GENDER_LABELS[specialist.gender] ?? specialist.gender;

    const fileIcon = "/assets/images/images.jpeg";

    return (
        <div className="overflow-hidden w-full">
            <div className="space-y-4 text-right flex flex-col md:flex-row  items-center justify-start gap-5 md:gap-20">
                <div className="flex items-center justify-between">
                    <div className=" flex items-center justify-start w-full">
                        {specialist.photoUrl ? (
                            <div className="relative flex items-center justify-center text-muted-foreground text-4xl w-60 h-60 rounded-full overflow-hidden ">
                                <Image
                                    src={specialist.photoUrl}
                                    alt={"photo"}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        ) : (
                            <div className="relative flex items-center justify-center text-muted-foreground text-4xl w-60 h-60 rounded-full overflow-hidden ">
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
                </div>
                <div className="flex flex-col flex-wrap w-full gap-5 md:gap-15 justify-around items-start">
                    <div className=" flex flex-col justify-center items-start">
                        <p className="text-2xl font-bold">{fullName}</p>
                        <span className="text-muted-foreground">
                            {profession}
                        </span>
                       <span>גיל: {getAgeFromBirthDate(specialist.birthDate)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:gap-10 items-start">
                        <div className="flex flex-col gap-4 text-sm justify-center items-start">
                            <span>
                                <strong>ניסיון</strong>: {specialist.experience}{" "}
                                שנים
                            </span>
                            <span>
                                <strong>מחיר</strong>: ₪
                                {specialist.pricePerSession} / פגישה
                            </span>
                        </div>
                        <div className="flex flex-col gap-4 text-sm justify-center items-start">
                            <span className="">
                                <strong>שפות</strong>: {languages}
                            </span>
                            <span>
                                <strong>מין</strong>: {gender}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
