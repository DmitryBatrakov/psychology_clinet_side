'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Search } from 'lucide-react';
import { SessionType } from '@/features/specialist/model/types';
import { SESSION_TYPE_LABELS } from '@/lib/labels';
import { notify } from '@/lib/notify';
import { toDateKey } from '@/lib/func/to-date-key/toDateKey';
import {
    ClientOption,
    MOCK_CLIENTS,
    normalize,
} from '@/features/calendar/lib/modal-helpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from '@/components/ui/calendar';
import { Sheet, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAvailableSlots } from '../../../hooks/useAvailableSlots';
import { TimeSlot, MOCK_WORK_HOURS } from '../../../lib/getAvailableSlots';
import { he } from 'date-fns/locale';

function ClientAvatar({ client }: { client: ClientOption }) {
    if (client.photoUrl) {
        return (
            <img
                src={client.photoUrl}
                alt=""
                className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
        );
    }
    return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
            {client.firstName[0]}
        </div>
    );
}

function SlotsSkeleton() {
    return (
        <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-16 rounded-full" />
            ))}
        </div>
    );
}

interface Props {
    open: boolean;
    onClose: () => void;
    sessionTypes: SessionType[];
}

export function QuickBookingModal({ open, onClose, sessionTypes }: Props) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [clientSearch, setClientSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState<ClientOption | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sessionType, setSessionType] = useState<SessionType | null>(sessionTypes[0] ?? null);

    const { data: slots = [], isLoading: slotsLoading } = useAvailableSlots(
        selectedDate ?? null,
    );

    const filteredClients = useMemo(() => {
        if (!clientSearch.trim()) return MOCK_CLIENTS;
        const q = normalize(clientSearch);
        return MOCK_CLIENTS.filter(
            (c) =>
                normalize(`${c.firstName}${c.lastName}`).includes(q) ||
                normalize(c.phoneNumber).includes(q),
        );
    }, [clientSearch]);

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        setSelectedSlot(null);
    };

    const handleSelectClient = (client: ClientOption) => {
        setSelectedClient(client);
        setClientSearch(`${client.firstName} ${client.lastName}`);
        setDropdownOpen(false);
    };

    const handleClientInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientSearch(e.target.value);
        setSelectedClient(null);
        setDropdownOpen(true);
    };

    const handleClose = () => {
        setSelectedDate(undefined);
        setSelectedSlot(null);
        setClientSearch('');
        setSelectedClient(null);
        setDropdownOpen(false);
        setSessionType('individual');
        onClose();
    };

    const handleCreate = () => {
        if (!selectedDate || !selectedSlot || !selectedClient) return;

        // SWAP POINT: replace console.log with useMutation → POST /api/specialist/sessions
        const session = {
            uid: `pending-${Date.now()}`,
            date: toDateKey(selectedDate),
            time: [selectedSlot.startHour, selectedSlot.endHour] as [number, number],
            type: sessionType,
            status: 'pending' as const,
            patient: {
                firstName: selectedClient.firstName,
                lastName: selectedClient.lastName,
                photoUrl: selectedClient.photoUrl ?? null,
                gender: 'male' as const,
                languages: [],
                birthDate: '',
            },
            description: sessionType ? SESSION_TYPE_LABELS[sessionType] : '',
            meet_url: '',
        };

        console.log('Creating session:', session);
        notify.success('הפגישה נוצרה בהצלחה');
        handleClose();
    };

    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const canCreate = !!selectedDate && !!selectedSlot && !!selectedClient && !!sessionType;

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
                <SheetPrimitive.Close className="absolute top-4 left-4 rounded-sm transition-all duration-200 bg-primary hover:brightness-105 cursor-pointer p-1 focus:outline-hidden disabled:pointer-events-none">
                    <XIcon className="size-4" />
                    <span className="sr-only">סגור</span>
                </SheetPrimitive.Close>

                <SheetHeader className="border-b pb-4 shrink-0">
                    <SheetTitle>פגישה חדשה</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 overflow-y-auto flex-1 px-4 py-4">
                    {/* Client search */}
                    <div className="space-y-1.5 flex flex-col gap-1">
                        <label className="text-sm font-medium text-foreground">לקוח</label>
                        <div className="relative">
                            <Search className="pointer-events-none absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="חיפוש לפי שם..."
                                value={clientSearch}
                                onChange={handleClientInput}
                                onFocus={() => setDropdownOpen(true)}
                                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                                className="pr-9 text-right"
                            />
                            {dropdownOpen && filteredClients.length > 0 && (
                                <div className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-lg border bg-white shadow-lg">
                                    {filteredClients.map((client) => (
                                        <button
                                            key={client.uid}
                                            onMouseDown={() => handleSelectClient(client)}
                                            className="flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-primary/5"
                                        >
                                            <ClientAvatar client={client} />
                                            <div className="flex flex-col items-start">
                                                <span className="font-medium text-foreground">
                                                    {client.firstName} {client.lastName}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {client.phoneNumber}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Session type */}
                    <div className="space-y-1.5 flex flex-col gap-1">
                        <label className="text-sm font-medium text-foreground">סוג פגישה</label>
                        <div className="grid grid-cols-2 gap-2">
                            {sessionTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSessionType(type)}
                                    className={`flex cursor-pointer items-center justify-center rounded-lg border py-2 text-sm font-medium transition-colors
                                        ${sessionType === type
                                            ? 'border-primary bg-primary text-foreground'
                                            : 'border-border text-muted-foreground hover:border-primary hover:bg-primary/30'
                                        }`}
                                >
                                    {SESSION_TYPE_LABELS[type]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Date picker */}
                    <div className="space-y-1.5 flex flex-col gap-1">
                        <label className="text-sm font-medium text-foreground">תאריך</label>
                        <div className="flex justify-center rounded-lg shadow-[inset_0_0_10px_0] shadow-black/10 p-2">
                            <Calendar
                                locale={he}
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                disabled={(d) => d < today || !MOCK_WORK_HOURS[d.getDay()]}
                                className="rounded-lg [--cell-size:--spacing(9)] p-0"
                                classNames={{ week: 'flex w-full mt-2 gap-x-1' }}
                            />
                        </div>
                    </div>

                    {/* Time slots */}
                    <div className="space-y-2 flex flex-col gap-1">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            שעת התחלה
                        </label>
                        {!selectedDate ? (
                            <p className="text-sm text-muted-foreground">בחר תאריך כדי לראות זמנים פנויים</p>
                        ) : slotsLoading ? (
                            <SlotsSkeleton />
                        ) : slots.length === 0 ? (
                            <p className="py-2 text-sm text-muted-foreground">אין זמנים פנויים ביום זה</p>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedDate?.toISOString()}
                                    className="grid grid-cols-4 gap-2"
                                >
                                    {slots.map((slot, index) => (
                                        <motion.button
                                            key={slot.startHour}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.18, ease: 'easeOut', delay: index * 0.04 }}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`cursor-pointer rounded-full border py-1.5 text-sm font-medium transition-colors text-center
                                                ${selectedSlot?.startHour === slot.startHour
                                                    ? 'border-primary bg-primary text-foreground'
                                                    : 'border-border text-muted-foreground hover:border-primary hover:bg-primary/10'
                                                }`}
                                        >
                                            {String(slot.startHour).padStart(2, '0')}:00
                                        </motion.button>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                </div>

                <SheetFooter className="border-t pt-4 shrink-0">
                    <Button
                        className="w-full cursor-pointer bg-green-500 text-foreground"
                        onClick={handleCreate}
                        disabled={!canCreate}
                    >
                        לקבוע פגישה
                    </Button>
                </SheetFooter>
                </SheetPrimitive.Content>
            </SheetPrimitive.Portal>
        </Sheet>
    );
}
