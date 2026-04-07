"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { SpecialistDTO } from "../model/types";
import { WORK_METHOD_LABELS } from "../model/specialistLabels";

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
    const [activeTab, setActiveTab] = useState<SectionKey>("about");

    const renderContent = () => {
        switch (activeTab) {
            case "about":
                return <p>{specialist.about || "—"}</p>;

            case "method":
                if (!specialist.workMethods.length) return <p>—</p>;
                return (
                    <ul className="list-disc list-inside space-y-1">
                        {specialist.workMethods.map((method) => (
                            <li key={method}>
                                {WORK_METHOD_LABELS[method] ?? method}
                            </li>
                        ))}
                    </ul>
                );

            case "education": {
                const { mainDegree, additionalDegrees } = specialist;
                const hasDegrees =
                    mainDegree.degreeName || additionalDegrees.length > 0;
                if (!hasDegrees) return <p>—</p>;
                return (
                    <div className="space-y-3">
                        {mainDegree.degreeName && (
                            <div>
                                <p className="font-semibold">{mainDegree.degreeName}</p>
                                {mainDegree.description && (
                                    <p className="text-muted-foreground">{mainDegree.description}</p>
                                )}
                            </div>
                        )}
                        {additionalDegrees.map((degree, i) => (
                            <div key={i}>
                                <p className="font-semibold">{degree.degreeName}</p>
                                {degree.description && (
                                    <p className="text-muted-foreground">{degree.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                );
            }

            case "values":
                return <p>{specialist.values || "—"}</p>;
        }
    };

    return (
        <Card className="w-full overflow-hidden">
            <div className="border-b">
                <div className="flex items-center gap-1 px-2 sm:px-0">
                    {SECTION_TABS.map((tab) => {
                        const isActive = tab.key === activeTab;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`relative shrink-0 px-4 py-3 text-xs sm:text-sm md:px-6 md:py-4 md:text-base whitespace-nowrap transition-colors font-semibold ${
                                    isActive
                                        ? "text-primary"
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
                <div className="h-48 overflow-y-auto px-4 py-4 text-sm leading-6 text-muted-foreground sm:h-52 sm:px-6 sm:py-5 sm:text-base sm:leading-7">
                    {renderContent()}
                </div>
            </CardContent>
        </Card>
    );
};
