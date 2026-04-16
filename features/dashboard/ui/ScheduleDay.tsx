'use client';

import Widget, { WidgetProps } from '@/components/blocks/widgets/widget';
import { CalendarDays } from 'lucide-react';
import { ScheduleDayBody, ScheduleDaySkeleton } from './ScheduleDayBody';

export function ScheduleDay({ ...rest }: WidgetProps) {
    return (
        <Widget {...rest}>
            <Widget.Header>
                <Widget.Title className="flex items-center gap-2 text-lg font-semibold">
                    <CalendarDays size={18} /> לוח יום
                </Widget.Title>
            </Widget.Header>
            <Widget.Content className="overflow-y-auto custom-scrollbar" skeleton={<ScheduleDaySkeleton />}>
                <ScheduleDayBody  />
            </Widget.Content>
        </Widget>
    );
}
