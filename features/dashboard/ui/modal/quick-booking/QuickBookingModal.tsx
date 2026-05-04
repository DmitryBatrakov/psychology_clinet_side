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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
        <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
            <DialogContent dir="rtl" className="sm:max-w-220 *:data-[slot=dialog-close]:right-auto *:data-[slot=dialog-close]:left-5 *:data-[slot=dialog-close]:top-5 *:data-[slot=dialog-close]:bg-primary *:data-[slot=dialog-close]:p-1 *:data-[slot=dialog-close]:rounded-sm *:data-[slot=dialog-close]:text-foreground">
                <DialogHeader>
                    <DialogTitle className="text-right">פגישה חדשה</DialogTitle>
                </DialogHeader>

                <div className="flex w-full justify-between items-start p-2 gap-5">
                    {/* Date */}
                    <div className=" flex flex-col items-center justify-start  w-1/2 p-4 shadow-[inset_0_0_10px_0] shadow-black/10 rounded-lg">
                        <label className="text-sm font-medium text-foreground w-full">תאריך</label>
                        <div className="flex justify-center min-h-95">
                            <Calendar
                                locale={he}
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                disabled={(d) => d < today || !MOCK_WORK_HOURS[d.getDay()]}
                                className="rounded-lg [--cell-size:--spacing(10)]  p-0"
                                classNames={{ week: "flex w-full mt-2 gap-x-2" }}
                            />
                        </div>

                        {/* Time slots — shown only after date is picked */}
                        <div className="min-h-50 space-y-2 flex flex-col items-start justify-start w-full">
                            <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                שעת התחלה
                            </label>
                            {slotsLoading ? (
                                <SlotsSkeleton />
                            ) : slots.length === 0 ? (
                                <div className='w-full flex items-center justify-center'>
                                    <p className="py-2 text-sm text-muted-foreground">
                                        אין זמנים פנויים ביום זה
                                    </p>
                                </div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedDate?.toISOString()}
                                        className="grid grid-cols-5 gap-2 w-full"
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

                    <div className="flex flex-col justify-between gap-6 w-1/2 h-full">
                        {/* Client search */}
                        <div className="flex flex-col items-start justify-start w-full p-4">
                            <div className="space-y-1.5 w-full">
                                <label className="text-sm font-medium text-foreground ">לקוח</label>
                                <div className="relative py-2">
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
                            <div className="space-y-1.5 w-full">
                                <label className="text-sm font-medium text-foreground">סוג פגישה</label>
                                <div className="grid grid-cols-2 gap-2 py-2">
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
                        </div>


                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                            <Button
                                className="flex-1 cursor-pointer bg-green-500 text-foreground"
                                onClick={handleCreate}
                                disabled={!canCreate}
                            >
                                לקבוע פגישה
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
