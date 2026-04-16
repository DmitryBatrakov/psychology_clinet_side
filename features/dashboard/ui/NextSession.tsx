'use client';

import Widget, { WidgetProps } from "@/components/blocks/widgets/widget";

import { CalendarClock } from "lucide-react";
import { NextSessionBody, NextSessionSkeleton } from "./NextSessionBody";

export function NextSession({ ...rest }: WidgetProps) {
    return (
        <Widget {...rest}>
            <Widget.Header>
                <Widget.Title className="flex items-center gap-2 text-lg font-semibold">
                    <CalendarClock size={18} /> הפגישה הבאה
                </Widget.Title>
            </Widget.Header>
            <Widget.Content skeleton={<NextSessionSkeleton />}>
                <NextSessionBody />
            </Widget.Content>
        </Widget>
    );
}

