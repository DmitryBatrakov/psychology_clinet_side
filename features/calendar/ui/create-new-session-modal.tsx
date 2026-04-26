'use client';
import { ShownDateInterval } from "@/src/app/(specialist)/calendar/page";
import { AnimatePresence, motion } from "motion/react";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const OFFSET = 12;

function ModalContent({ x, y }: { x: number; y: number }) {
    const { getter: { newSession }, setter: { setNewSession } } = useContext(ShownDateInterval);
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ left: x + OFFSET, top: y + OFFSET });


    useLayoutEffect(() => {
        if (!ref.current) return;
        const { offsetWidth, offsetHeight } = ref.current;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        setPos({
            left: Math.min(x + OFFSET, vw - offsetWidth - 40),
            top: Math.min(y + OFFSET, vh - offsetHeight - 40),
        });
        if (newSession) {
            
        }
    }, [x, y]);

    return (
        <motion.div
            dir="rtl"
            ref={ref}
            key="new-session-modal"
            initial={{ opacity: 0, x: 34, scale: 0.99 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 34, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-80 w-80 h-90 rounded-lg border border-secondary bg-white shadow-xl"
            style={{ left: pos.left, top: pos.top }}
        >
            <div className="flex items-center justify-between border-b px-4 py-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setNewSession(null)}
                >
                    <X className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">פגישה חדשה</span>
            </div>

            <div className="p-4 space-y-3 text-sm text-muted-foreground">
                {newSession && (
                    <>
                        <p>תאריך: {newSession.date.toLocaleDateString()}</p>
                        <p>זמן: {newSession.startHour}:00 — {newSession.endHour}:00</p>
                    </>
                )}
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
                <div className="bg-black/10 fixed inset-0 z-40"
                    style={{ width: vw, height: vh }}
                >
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setNewSession(null)}
                    />
                    <ModalContent x={newSession.x} y={newSession.y} />
                </div>
            )}
        </AnimatePresence>
    );
}
