"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useSpecialistById } from "@/features/specialist/hooks/useSpecialistById";
import { ArrowLeftFromLine } from "lucide-react";
import { SpecialistOverviewCard } from "@/features/specialist/ui/SpecialistOverviewCard";
import { SpecialistServices } from "@/features/specialist/ui/SpecialistServices";
import { SpecialistProfileSections } from "@/features/specialist/ui/SpecialistProfileSections";
import { Faq } from "@/components/faq/Faq";
import { Separator } from "@/components/ui/separator";

function resolveReturnTo(
    rawReturnTo: string | null,
    fallbackProfession?: string,
): string {
    if (rawReturnTo) {
        const decoded = decodeURIComponent(rawReturnTo);
        if (decoded.startsWith("/catalog")) {
            return decoded;
        }
    }

    if (fallbackProfession) {
        return `/catalog?profession=${fallbackProfession}`;
    }
    return "/catalog";
}

export default function SpecialistDetailsPage() {
    const params = useParams<{ id: string | string[] }>();
    const specialistId = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const specialistQuery = useSpecialistById(specialistId);
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnToRaw = searchParams.get("returnTo");

    if (specialistQuery.isPending)
        return (
            <div className="px-4 w-full max-w-6xl mx-auto py-10">
                <SpecialistPageSkeleton />
            </div>
        );

    if (specialistQuery.isError) {
        return (
            <div className="w-full max-w-5xl mx-auto px-4 py-8" dir="rtl">
                <p className="text-destructive text-right">
                    לא ניתן לטעון את המומחה. נסה שוב מאוחר יותר.
                </p>
            </div>
        );
    }

    const specialist = specialistQuery.data;
    if (!specialist) {
        return (
            <div
                className="w-full h-full max-w-5xl mx-auto px-4 py-8 space-y-4 flex flex-col items-center justify-center "
                dir="rtl"
            >
                <h1 className="text-2xl font-bold text-right">
                    המומחה לא נמצא
                </h1>
                <p className="text-muted-foreground text-right">
                    בחר מומחה מהקטלוג מחדש
                </p>
                <div className="">
                    <Button
                        variant="default"
                        onClick={() =>
                            router.push(resolveReturnTo(returnToRaw))
                        }
                    >
                        חזרה לקטלוג
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-20" dir="rtl">
            <div className="flex justify-end">
                <Button
                    variant="link"
                    onClick={() =>
                        router.push(
                            resolveReturnTo(returnToRaw, specialist.profession),
                        )
                    }
                >
                    <span>חזרה לקטלוג</span>
                    <ArrowLeftFromLine className="w-4 h-4" />
                </Button>
            </div>
            <div className="flex flex-col gap-10 items-center justify-center w-full h-full mx-auto">
                {/* <SpecialistPageSkeleton /> */}
                <SpecialistOverviewCard specialist={specialist} />
                <SpecialistServices
                    services={specialist.services}
                    serviceLabels={specialist.serviceLabels ?? {}}
                />
                <SpecialistProfileSections specialist={specialist} />
                <Faq />
            </div>
        </div>
    );
}

function SpecialistPageSkeleton() {
    return (
        <div
            className="w-full max-w-6xl mx-auto flex flex-col gap-10 border bg-accent/10 rounded-xl my-20 p-6"
            dir="rtl"
        >
            <div className="w-full flex gap-15 items-start justify-start">
                <div className="flex flex-col items-start justify-start gap-4">
                    <div className="w-60 h-60 rounded-full bg-accent/20 " />
                </div>

                <div className="flex flex-col gap-30 items-start justify-around">
                    <div className="w-full flex flex-col gap-3 items-start justify-start">
                        <div className="w-50 h-5 bg-accent/20 animate-pulse" />
                        <span className="w-32 h-3 bg-accent/20 animate-pulse" />
                        <span className="w-24 h-3 bg-accent/20 animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:gap-10 items-start">
                        <div className="flex flex-col gap-4 text-sm justify-center items-start">
                            <div className="w-50 h-4 bg-accent/20 animate-pulse" />
                            <div className="w-50 h-4 bg-accent/20 animate-pulse" />
                        </div>
                        <div className="flex flex-col gap-4 text-sm justify-center items-start">
                            <div className="w-50 h-4 bg-accent/20 animate-pulse" />
                            <div className="w-50 h-4 bg-accent/20 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="h-80" />
        </div>
    );
}
