'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    CalendarPlus,
    LucideIcon,
    Shredder,
    UserPlus,
} from 'lucide-react';
import { useAtomValue } from 'jotai';
import { authAtom } from '@/src/store/auth/authAtom';
import { useSpecialistById } from '@/features/specialist/hooks/useSpecialistById';
import { QuickBookingModal } from './modal/quick-booking/QuickBookingModal';
import { QuickAddClientsModal } from './modal/add-client/QuickAddClientsModal';
import { QuickCancellationModal } from './modal/cancellation/QuickCancellationModal';

type Action = {
    icon: LucideIcon;
    title: string;
    action: () => void;
    color: { text: string; bg: string };
};

export default function QuickActionsBody() {
    const { user, loading: authLoading } = useAtomValue(authAtom);
    const { data: specialist } = useSpecialistById(user?.uid);
    const sessionTypes = specialist?.sessionTypes ?? ['individual', 'couple', "child", "teen"];

    const [bookingOpen, setBookingOpen] = useState(false);
    const [addClientOpen, setAddClientOpen] = useState(false);
    const [cancellationOpen, setCancellationOpen] = useState(false);

    const actions: Action[] = [
        {
            icon: CalendarPlus,
            title: 'New Booking',
            action: () => setBookingOpen(true),
            color: { text: 'text-green-500', bg: 'bg-green-100!' },
        },
        {
            icon: UserPlus,
            title: 'Add client',
            action: () => setAddClientOpen(true),
            color: { text: 'text-blue-500', bg: 'bg-blue-100!' },
        },
        {
            icon: Shredder,
            title: 'Cancellation',
            action: () => setCancellationOpen(true),
            color: { text: 'text-red-500', bg: 'bg-red-100!' },
        },
    ];

    return (
        <>
            <div className="grid size-full grid-cols-3 gap-2">
                {actions.map(({ action, title, icon: Icon, color }, index) => (
                    <Button
                        onClick={action}
                        variant={'secondary'}
                        key={`action-${title}-${index}`}
                        className={cn(
                            'h-full cursor-pointer flex-col hover:brightness-98 active:brightness-96',
                            color.bg,
                            color.text
                        )}
                    >
                        <Icon className="size-6" />
                        <span>{title}</span>
                    </Button>
                ))}
            </div>

            <QuickBookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} sessionTypes={sessionTypes} />
            <QuickAddClientsModal open={addClientOpen} onClose={() => setAddClientOpen(false)} />
            <QuickCancellationModal open={cancellationOpen} onClose={() => setCancellationOpen(false)} />

        </>
    );
}

