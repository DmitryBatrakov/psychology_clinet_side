'use client'

import { ShownDateInterval } from "@/src/app/(specialist)/calendar/page";
import { AnimatePresence, motion } from "motion/react";
import { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { X, Search, Clock } from "lucide-react";
import { SessionType } from "@/features/specialist/model/types";
import { SESSION_TYPE_LABELS } from "@/lib/labels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ClientOption,
    MOCK_CLIENTS,
    MODAL_WIDTH,
    OFFSET_X,
    OFFSET_Y,
    SCREEN_MARGIN,
    formatHeDate,
    normalize,
} from "@/features/calendar/lib/modal-helpers";
import { toDateKey } from "@/lib/func/to-date-key/toDateKey";

function ClientAvatar({ client }: { client: ClientOption }) {
    if (client.photoUrl) {
        return <img src={client.photoUrl} alt="" className="h-8 w-8 rounded-full object-cover shrink-0" />;
    }
    return (
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
            {client.firstName[0]}
        </div>
    );
}

function ModalContent({ x, y }: { x: number; y: number }) {
    const { getter: { newSession }, setter: { setNewSession, addPendingSession } } = useContext(ShownDateInterval);
    const ref = useRef<HTMLDivElement>(null);
    const isRightHalf = x > window.innerWidth / 2;

    const [pos, setPos] = useState({
        left: isRightHalf ? x - MODAL_WIDTH - OFFSET_X : x + OFFSET_X,
        top: y + OFFSET_Y,
    });

    const [clientSearch, setClientSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState<ClientOption | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sessionType, setSessionType] = useState<SessionType>('individual');

    const filteredClients = useMemo(() => {
        if (!clientSearch.trim()) return MOCK_CLIENTS;
        const query = normalize(clientSearch);
        return MOCK_CLIENTS.filter(c =>
            normalize(`${c.firstName}${c.lastName}`).includes(query) ||
            normalize(c.phoneNumber).includes(query)
        );
    }, [clientSearch]);

    const handleCreate = () => {
        if (!selectedClient || !newSession) return;
        addPendingSession({
            uid: `pending-${Date.now()}`,
            date: toDateKey(newSession.date),
            patient: {
                firstName: selectedClient.firstName,
                lastName: selectedClient.lastName,
                photoUrl: selectedClient.photoUrl ?? null,
                gender: 'male',
                languages: [],
                birthDate: '',
            },
            description: SESSION_TYPE_LABELS[sessionType],
            meet_url: '',
            time: [newSession.startHour, newSession.endHour],
            type: sessionType,
            status: 'pending',
        });
        setNewSession(null);
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

    useLayoutEffect(() => {
        if (!ref.current) return;
        const { offsetWidth, offsetHeight } = ref.current;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        setPos({
            left: isRightHalf
                ? Math.max(x - offsetWidth - OFFSET_X, SCREEN_MARGIN)
                : Math.min(x + OFFSET_X, vw - offsetWidth - SCREEN_MARGIN),
            top: Math.min(y - OFFSET_Y, vh - offsetHeight - SCREEN_MARGIN),
        });
    }, [x, y]);

    const slide = isRightHalf ? -40 : 40;

    return (
        <motion.div
            dir="rtl"
            ref={ref}
            key="new-session-modal"
            initial={{ opacity: 0, x: slide }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slide }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-80 rounded-xl border border-primary/20 bg-white shadow-2xl"
            style={{ left: pos.left, top: pos.top, width: MODAL_WIDTH }}
        >
            <div className="flex items-center justify-between border-b px-5 py-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 cursor-pointer"
                    onClick={() => setNewSession(null)}
                    asChild
                >
                    <X className="h-5 w-5 bg-primary rounded-sm p-1 text-white" />
                </Button>
                <span className="text-base font-semibold text-foreground">פגישה חדשה</span>
            </div>

            <div className="p-5 space-y-5">
                {newSession && (
                    <div className="flex items-center gap-4 text-sm text-foreground bg-primary/20 font-semibold rounded-lg px-4 py-3">
                        <span>{formatHeDate(newSession.date)}</span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {newSession.startHour}:00 — {newSession.endHour}:00
                        </span>
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">לקוח</label>
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                        <Input
                            placeholder="חיפוש לפי שם..."
                            value={clientSearch}
                            onChange={handleClientInput}
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                            className="pr-9 text-right"
                        />
                        {dropdownOpen && filteredClients.length > 0 && (
                            <div className="absolute top-full mt-1 w-full rounded-lg border bg-white shadow-lg z-50 overflow-hidden">
                                {filteredClients.map(client => (
                                    <button
                                        key={client.uid}
                                        onMouseDown={() => handleSelectClient(client)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-primary/5 transition-colors cursor-pointer"
                                    >
                                        <ClientAvatar client={client} />
                                        <div className="flex flex-col items-start">
                                            <span className="font-medium text-foreground">{client.firstName} {client.lastName}</span>
                                            <span className="text-xs text-muted-foreground">{client.phoneNumber}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">סוג פגישה</label>
                    <div className="grid grid-cols-2 gap-2 py-2">
                        {(Object.keys(SESSION_TYPE_LABELS) as SessionType[]).map(type => (
                            <button
                                key={type}
                                onClick={() => setSessionType(type)}
                                className={`flex-1 flex items-center justify-center rounded-lg border py-2 text-sm font-medium transition-colors cursor-pointer
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

                <div className="flex gap-2 pt-5">
                    <Button variant="outline" className="flex-1 cursor-pointer" onClick={() => setNewSession(null)}>
                        ביטול
                    </Button>
                    <Button
                        className="flex-1 cursor-pointer bg-green-500 text-foreground"
                        onClick={handleCreate}
                        disabled={!selectedClient}
                    >
                        יצירת פגישה
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

export function NewSessionModal() {
    const { getter: { newSession }, setter: { setNewSession } } = useContext(ShownDateInterval);
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    return (
        <AnimatePresence>
            {newSession && (
                <div
                    className="fixed inset-0 z-40 bg-black/10"
                    style={{ width: vw, height: vh }}
                >
                    <div className="fixed inset-0 z-40" onClick={() => setNewSession(null)} />
                    <ModalContent x={newSession.x} y={newSession.y} />
                </div>
            )}
        </AnimatePresence>
    );
}