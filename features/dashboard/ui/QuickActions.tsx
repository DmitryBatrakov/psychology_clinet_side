'use client';
import { Zap } from 'lucide-react';
import QuickActionsBody from './QuickActionsBody';
import Widget, { WidgetProps } from '@/components/blocks/widgets/widget';

export function QuickActions({ ...rest }: WidgetProps) {
    return (
        <Widget {...rest}>
            <Widget.Header>
                <Widget.Title className="flex items-center gap-2 text-lg font-semibold">
                    <Zap size={18} /> Quick Actions
                </Widget.Title>
            </Widget.Header>
            <Widget.Content>
                <QuickActionsBody />
            </Widget.Content>
        </Widget>
    );
}

