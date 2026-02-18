"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useSpecialistById } from "@/features/specialist/hooks/useSpecialistById";
import { getServiceLabel } from "@/features/catalog/model/serviceTopics";
import { ArrowLeftFromLine } from "lucide-react";

const PROFESSION_LABELS: Record<string, string> = {
    psychologist: "Психолог",
    therapist: "Психотерапевт",
    coach: "Коуч",
};

const LANGUAGE_LABELS: Record<string, string> = {
    he: "עברית",
    ru: "Русский",
    en: "English",
    uk: "Українська",
    ar: "العربية",
};

const MEETING_FORMAT_LABELS: Record<string, string> = {
    online: "Онлайн",
    offline: "Офлайн",
};

const GENDER_LABELS: Record<string, string> = {
    male: "Мужской",
    female: "Женский",
};

function SpecialistPageSkeleton() {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-8" dir="rtl">
            <div className="rounded-xl border bg-card min-h-[420px] animate-pulse" />
        </div>
    );
}

export default function SpecialistDetailsPage() {
    const params = useParams<{ id: string | string[] }>();
    const specialistId = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const specialistQuery = useSpecialistById(specialistId);
    const router = useRouter();

    if (specialistQuery.isPending) return <SpecialistPageSkeleton />;

    if (specialistQuery.isError) {
        return (
            <div className="w-full max-w-5xl mx-auto px-4 py-8" dir="rtl">
                <p className="text-destructive text-right">
                    Не удалось загрузить специалиста. Попробуйте позже.
                </p>
            </div>
        );
    }

    const specialist = specialistQuery.data;
    if (!specialist) {
        return (
            <div
                className="w-full max-w-5xl mx-auto px-4 py-8 space-y-4"
                dir="rtl"
            >
                <h1 className="text-2xl font-bold text-right">
                    Специалист не найден
                </h1>
                <p className="text-muted-foreground text-right">
                    Проверьте ссылку или выберите специалиста в каталоге.
                </p>
                <div className="flex justify-end">
                    <Button
                        variant="default"
                        asChild
                        onClick={() => router.push(`/catalog`)}
                    >
                        Back to Catalog
                    </Button>
                </div>
            </div>
        );
    }

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

    const onWaitlistClick = () => {
        window.alert("Заглушка: вы добавлены в лист ожидания.");
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-8" dir="rtl">
            <div className="flex justify-end">
                <Button variant="link" onClick={() => router.push(`/catalog`)}>
                    <span>Back to Catalog</span>
                    <ArrowLeftFromLine className="w-4 h-4" />
                </Button>
            </div>
            <Card className="overflow-hidden">
                <CardHeader className="p-0">
                    <div className="relative aspect-16/6 w-full bg-muted">
                        {specialist.photoUrl ? (
                            <Image
                                src={specialist.photoUrl}
                                alt={fullName}
                                fill
                                className="object-cover"
                                sizes="100vw"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground text-6xl">
                                {specialist.firstName.charAt(0)}
                                {specialist.lastName.charAt(0)}
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4 text-right">
                    <div>
                        <h1 className="text-2xl font-bold">{fullName}</h1>
                        <p className="text-muted-foreground">{profession}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <p>Опыт: {specialist.experience} лет</p>
                        <p>Цена: ₪{specialist.pricePerSession} / сессия</p>
                        <p>Пол: {gender}</p>
                        <p>Формат: {meetingFormat}</p>
                        <p className="md:col-span-2">Языки: {languages}</p>
                        <p className="md:col-span-2">
                            Телефон: {specialist.phoneNumber}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="font-semibold">Темы</h2>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                            {specialist.services.map((service) => (
                                <li key={service}>
                                    {getServiceLabel(service)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-end gap-3">
                    <Button onClick={onWaitlistClick}>
                        Встать в лист ожидания
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
