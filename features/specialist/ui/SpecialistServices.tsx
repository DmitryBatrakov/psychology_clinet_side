"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dot } from "lucide-react";

export const SpecialistServices = ({
    services,
    serviceLabels,
}: {
    services: string[];
    serviceLabels: Record<string, string>;
}) => {
    if (!services.length) return null; 

    return (
        <Card className="w-full p-4">
            <CardHeader>
                <h2 className="text-2xl font-semibold">Services</h2>
            </CardHeader>
            <CardContent className="h-56 overflow-y-auto">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {services.map((service) => (
                        <li key={service} className="flex items-center text-sm md:text-base text-muted-foreground">
                            <Dot size={24} />
                            {serviceLabels[service] ?? service}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};