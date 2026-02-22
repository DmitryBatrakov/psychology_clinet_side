"use client";
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { therapistAdviceData } from "@/mockData/therapy-faq/therapist-faq-data";
import { TherapistFaqItem } from "../../model/types";
import { useEffect, useState } from "react";
import { TherapyFaqModal } from "./TherapyFaqModal";

export const TherapistFaq = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [selectedCard, setSelectedCard] = useState<TherapistFaqItem | null>(
        null,
    );

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    useEffect(() => {
        if (selectedCard) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedCard]);

    useEffect(() => {
        if (!api) return;

        const updateScrollState = () => {
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        };
        updateScrollState();
        api.on("select", updateScrollState);
        api.on("reInit", updateScrollState);

        return () => {
            api.off("select", updateScrollState);
            api.off("reInit", updateScrollState);
        };
    }, [api]);

    const therapistFaqData: TherapistFaqItem[] = therapistAdviceData;

    return (
        <div className="w-full flex flex-col gap-4 items-center justify-center">
            <div className="w-full max-w-3xl" dir="rtl">
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        direction: "rtl",
                    }}
                    className="w-full"
                >
                    <div className="flex gap-1 justify-between  h-full">
                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => api?.scrollPrev()}
                                className={`px-4 py-2 border rounded ${
                                    !canScrollPrev
                                        ? "opacity-50 "
                                        : "hover:bg-accent"
                                }`}
                                disabled={!canScrollPrev}
                            >
                                →
                            </button>
                        </div>
                        <CarouselContent className="-ml-1 w-full items-center justify-center">
                            {therapistFaqData.map((card) => {
                                const Icon = card.icon;

                                return (
                                    <CarouselItem
                                        key={card.id}
                                        className="basis-full pl-1 lg:basis-1/3"
                                    >
                                        <div className="p-1">
                                            <Card
                                                className="h-[200px] w-[200px]"
                                                onClick={() =>
                                                    setSelectedCard(card)
                                                }
                                            >
                                                <CardHeader>
                                                    <div className="flex flex-col items-center gap-2">
                                                        <Icon className="w-5 h-5" />{" "}
                                                        <CardTitle>
                                                            {card.questions}
                                                        </CardTitle>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => api?.scrollNext()}
                                className={`px-4 py-2 border rounded ${
                                    !canScrollNext
                                        ? "opacity-50 "
                                        : "hover:bg-accent"
                                }`}
                                disabled={!canScrollNext}
                            >
                                ←
                            </button>
                        </div>
                    </div>
                </Carousel>
            </div>
            {selectedCard && (
                <TherapyFaqModal
                    card={selectedCard}
                    onClose={() => setSelectedCard(null)}
                />
            )}
        </div>
    );
};
