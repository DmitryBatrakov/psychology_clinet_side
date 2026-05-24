'use client';

import { useState, useMemo } from 'react';
import { ChevronRight, AlertTriangle, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SESSION_TYPE_LABELS } from '@/lib/labels';
import { notify } from '@/lib/notify';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import type { ScheduleDayItem } from '../../../model/types';
import { useSpecialistUpcomingSessions } from '../../../hooks/useSpecialistUpcomingSessions';
import { buildDateLabel, formatTimeRange, groupByDate } from '../../../lib/cancellationHelpers';
import { SessionRow } from './SessionRow';
import { CancellationListSkeleton } from './CancellationListSkeleton';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function QuickCancellationModal({ open, onClose }: Props) {
    const [selected, setSelected] = useState<ScheduleDayItem | null>(null);

    const { data, isLoading } = useSpecialistUpcomingSessions();

    const groups = useMemo(() => groupByDate(data?.items ?? []), [data]);

    const handleClose = () => {
        setSelected(null);
        onClose();
    };

    const handleConfirm = () => {
        // SWAP POINT: replace with useMutation → PATCH /api/specialist/sessions/:id/cancel
        console.log('Canceling session:', selected?.session.id);
        notify.success('הפגישה בוטלה בהצלחה');
        handleClose();
    };

    return (
        <Sheet open={open} onOpenChange={(o) => !o && handleClose()}>
            <SheetPrimitive.Portal>
                <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[3px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <SheetPrimitive.Content
                    dir="rtl"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className={cn(
                        'bg-background fixed inset-y-0 right-0 z-50 flex h-full w-3/4 flex-col gap-0 border-l shadow-lg transition ease-in-out sm:max-w-md',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out',
                        'data-[state=closed]:duration-300 data-[state=open]:duration-500',
                        'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
                        'overflow-hidden',
                    )}
                >
                    <SheetPrimitive.Close className="absolute top-4 left-4 rounded-sm bg-primary p-1 text-foreground opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                        <XIcon />
                        <span className="sr-only">סגור</span>
                    </SheetPrimitive.Close>

                    <div className="flex flex-col flex-1 overflow-hidden">
                        <AnimatePresence mode="wait" initial={false}>
                            {!selected ? (
                                <motion.div
                                    key="list"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                    className="flex flex-col flex-1 overflow-hidden"
                                >
                                    <SheetHeader className="border-b pb-4 shrink-0">
                                        <SheetTitle className="text-muted-foreground">ביטול פגישה</SheetTitle>
                                    </SheetHeader>

                                    <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
                                        {isLoading ? (
                                            <CancellationListSkeleton />
                                        ) : groups.length === 0 ? (
                                            <p className="py-8 text-center text-sm text-muted-foreground">
                                                אין פגישות קרובות
                                            </p>
                                        ) : (
                                            <div className="space-y-4">
                                                {groups.map((group) => (
                                                    <div key={group.key}>
                                                        <p className="mb-1 px-3 text-base font-semibold uppercase tracking-wide text-foreground underline">
                                                            {group.label}
                                                        </p>
                                                        <div className="space-y-0.5">
                                                            {group.items.map((item) => (
                                                                <SessionRow
                                                                    key={item.session.id}
                                                                    item={item}
                                                                    onClick={() => setSelected(item)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="confirm"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                    className="flex flex-col flex-1 overflow-hidden"
                                >
                                    <SheetHeader className="border-b pb-4 shrink-0">
                                        <button
                                            onClick={() => setSelected(null)}
                                            className="flex w-fit cursor-pointer items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                            חזרה לרשימה
                                        </button>
                                        {/* <SheetTitle>אישור ביטול</SheetTitle> */}
                                    </SheetHeader>

                                    <div className="flex flex-col justify-between flex-1 gap-6 overflow-y-auto px-4 py-4">
                                        <div className='flex flex-col justify-between gap-5'>
                                            <p className="text-foreground text-base font-semibold">אישור ביטול</p>
                                            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-accent/30 p-6">
                                                <Avatar className="h-24 w-24 text-xl shrink-0">
                                                    <AvatarImage src={selected.patient.photoUrl ?? undefined} />
                                                    <AvatarFallback>{selected.patient.firstName[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="text-center">
                                                    <p className="text-lg font-semibold text-foreground">
                                                        {selected.patient.firstName} {selected.patient.lastName}
                                                    </p>
                                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                                        {buildDateLabel(selected.session.startAt)},{' '}
                                                        {formatTimeRange(selected.session.startAt, selected.session.endAt)}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {SESSION_TYPE_LABELS[selected.session.type]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* TODO: Add mascot with message */}
                                        <div>
                                            Mascot with message
                                        </div>

                                        <div className='flex flex-col gap-5 justify-between'>
                                            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                                                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                                                <span>ביטול הפגישה הוא פעולה בלתי הפיכה</span>
                                            </div>

                                            <div className="flex gap-2 shrink-0">
                                                <Button
                                                    variant="outline"
                                                    className="flex-1 cursor-pointer"
                                                    onClick={() => setSelected(null)}
                                                >
                                                    חזור
                                                </Button>
                                                <Button
                                                    className="flex-1 cursor-pointer bg-destructive text-white hover:bg-destructive/90"
                                                    onClick={handleConfirm}
                                                >
                                                    לבטל פגישה
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </SheetPrimitive.Content>
            </SheetPrimitive.Portal>
        </Sheet>
    );
}
