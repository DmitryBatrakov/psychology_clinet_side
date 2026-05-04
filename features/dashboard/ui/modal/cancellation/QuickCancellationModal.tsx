'use client';

import { useState, useMemo } from 'react';
import { ChevronRight, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SESSION_TYPE_LABELS } from '@/lib/labels';
import { notify } from '@/lib/notify';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
    console.log(data?.items);
    

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
        <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
            <DialogContent
                dir="rtl"
                className="sm:max-w-150 *:data-[slot=dialog-close]:right-auto *:data-[slot=dialog-close]:left-5 *:data-[slot=dialog-close]:top-5 *:data-[slot=dialog-close]:bg-primary *:data-[slot=dialog-close]:p-1 *:data-[slot=dialog-close]:rounded-sm *:data-[slot=dialog-close]:text-foreground "
            >
                <div className="relative h-110">
                    <AnimatePresence mode="wait" initial={false}>
                        {!selected ? (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.18, ease: 'easeOut' }}
                                className="absolute inset-0 flex flex-col"
                            >
                                <DialogHeader>
                                    <DialogTitle className="text-right text-muted-foreground">ביטול פגישה</DialogTitle>
                                </DialogHeader>

                                <div className="mt-2 flex-1 overflow-y-auto custom-scrollbar">
                                    {isLoading ? (
                                        <CancellationListSkeleton />
                                    ) : groups.length === 0 ? (
                                        <p className="py-8 text-center text-sm text-muted-foreground">
                                            אין פגישות קרובות
                                        </p>
                                    ) : (
                                        <div className="space-y-4 p-1">
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
                                className="absolute inset-0 flex flex-col gap-6"
                            >
                                <DialogHeader>
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="flex w-fit cursor-pointer items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                        חזרה לרשימה
                                    </button>
                                    <DialogTitle className="text-right">אישור ביטול</DialogTitle>
                                </DialogHeader>

                                <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-accent/30 p-6">
                                    <Avatar className="h-16 w-16 text-xl shrink-0">
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

                                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span>ביטול הפגישה הוא פעולה בלתי הפיכה</span>
                                </div>

                                <div className="flex gap-2">
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
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
