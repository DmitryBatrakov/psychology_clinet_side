"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceLabel } from "@/features/catalog/model/serviceTopics";
import type { SpecialistDTO } from "../model/types";
import {
    LANGUAGE_LABELS,
    MEETING_FORMAT_LABELS,
    PROFESSION_LABELS,
    SESSION_TYPE_LABELS,
} from "../model/specialistLabels";

type SectionKey = "about" | "method" | "education" | "values";

const SECTION_TABS: Array<{ key: SectionKey; label: string }> = [
    { key: "about", label: "עליי" },
    { key: "method", label: "שיטת עבודה" },
    { key: "education", label: "השכלה" },
    { key: "values", label: "הערכים שלי" },
];

interface SpecialistProfileSectionsProps {
    specialist: SpecialistDTO;
}

export const SpecialistProfileSections = ({
    specialist,
}: SpecialistProfileSectionsProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState(0);

    const sections = useMemo(() => {
        const fullName = `${specialist.firstName} ${specialist.lastName}`;
        const profession =
            PROFESSION_LABELS[specialist.profession] ?? specialist.profession;
        const languages = specialist.languages
            .map((lang) => LANGUAGE_LABELS[lang] ?? lang)
            .join(", ");
        const meetingFormat =
            MEETING_FORMAT_LABELS[specialist.meetingFormat] ??
            specialist.meetingFormat;
        const sessionTypes = specialist.sessionTypes
            .map((type) => SESSION_TYPE_LABELS[type] ?? type)
            .join(", ");
        const topServices = specialist.services
            .slice(0, 8)
            .map((service) => getServiceLabel(service))
            .join(", ");

        return {
            // TODO: replace temporary mapping with dedicated API fields.
            about: `${fullName} — ${profession}. Опыт: ${specialist.experience} лет. Стоимость сессии: ₪${specialist.pricePerSession}.`,
            method: `Формат встреч: ${meetingFormat}. Типы сессий: ${sessionTypes || "не указано"}.`,
            education: `Временный контент до API: рабочие языки специалиста — ${languages || "не указано"}.`,
            values: `Временный контент до API: ключевые темы — ${topServices || "не указано"}.`,
        };
    }, [specialist]);


    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setActiveIndex(api.selectedScrollSnap());
        };

        onSelect();
        api.on("select", onSelect);
        api.on("reInit", onSelect);

        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api]);

    const handleTabClick = (index: number) => {
        api?.scrollTo(index);
        setActiveIndex(index);
    };

    const sectionItems = [
        sections.about,
        sections.method,
        sections.education,
        sections.values,
    ];

    return (
        <Card className="w-full overflow-hidden">
            <div className="border-b">
                <div className="flex items-center gap-1  px-2 sm:px-0">
                    {SECTION_TABS.map((tab, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => handleTabClick(index)}
                                className={`relative shrink-0 px-4 py-3 text-xs sm:text-sm md:px-6 md:py-4 md:text-base whitespace-nowrap transition-colors font-semibold ${
                                    isActive
                                        ? "text-primary "
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {tab.label}
                                <span
                                    className={`absolute left-0 right-0 bottom-0 h-0.5 transition-opacity ${
                                        isActive ? "bg-primary opacity-100" : "opacity-0"
                                    }`}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>

            <CardContent className="p-0">
                <Carousel
                    setApi={setApi}
                    opts={{ align: "start", direction: "rtl", containScroll: "trimSnaps" }}
                    className="w-full"
                >
                    <CarouselContent>
                        {sectionItems.map((sectionText, index) => (
                            <CarouselItem key={SECTION_TABS[index].key}>
                                <div className="h-48 overflow-y-auto px-4 py-4 text-sm leading-6 text-muted-foreground sm:h-52 sm:px-6 sm:py-5 sm:text-base sm:leading-7">
                                    {sectionText}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </CardContent>
        </Card>
    );
};
