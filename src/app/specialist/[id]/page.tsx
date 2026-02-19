"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useSpecialistById } from "@/features/specialist/hooks/useSpecialistById";
import { ArrowLeftFromLine } from "lucide-react";
import { SpecialistCard } from "@/features/specialist/ui/SpecialistCard";

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
                    לא ניתן לטעון את המומחה. נסה שוב מאוחר יותר.
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
                    המומחה לא נמצא
                </h1>
                <p className="text-muted-foreground text-right">
                    בדוק את הקישור או בחר מומחה מהקטלוג.
                </p>
                <div className="flex justify-end">
                    <Button
                        variant="default"
                        asChild
                        onClick={() => router.push(`/catalog`)}
                    >
                        חזרה לקטלוג
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-8" dir="rtl">
            <div className="flex justify-end">
                <Button variant="link" onClick={() => router.push(`/catalog`)}>
                    <span>חזרה לקטלוג</span>
                    <ArrowLeftFromLine className="w-4 h-4" />
                </Button>
            </div>
            <SpecialistCard specialist={specialist} />
        </div>
    );
}
