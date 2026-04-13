'use client';

import Widget, { WidgetProps } from "@/components/blocks/widgets/widget";
import { GreetingSectionBody, GreetingSectionSkeleton } from "./GreetingsBody";

export function GreetingSection({ ...rest }: WidgetProps) {
    return (
        <Widget {...rest}>
            <Widget.Content skeleton={<GreetingSectionSkeleton />}>
                <GreetingSectionBody />
            </Widget.Content>
        </Widget>
    );
}
