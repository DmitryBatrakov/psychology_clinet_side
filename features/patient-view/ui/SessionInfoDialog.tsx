"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CalendarDays, Clock, ExternalLink } from "lucide-react";
import type { SessionDTO } from "@/features/session/model/types";
import { SESSION_TYPE_LABELS } from "@/features/session/lib/sessionTypeLabels";
import { formatSessionDate, formatSessionTime } from "@/features/session/lib/formatSession";

export type SessionInfoDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    session: SessionDTO;
    editable?: boolean;
    hideMeetingUrl?: boolean;
};

export function SessionInfoDialog({
    open,
    onOpenChange,
    title,
    session,
    editable = false,
    hideMeetingUrl = false,
}: SessionInfoDialogProps) {
    const [notes, setNotes] = useState(session.notes ?? "");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm">
                            <CalendarDays size={15} className="text-muted-foreground shrink-0" />
                            <span>{formatSessionDate(session.startAt)}</span>
                        </div>
                        <Badge variant="outline" className="w-fit text-xs">
                            {SESSION_TYPE_LABELS[session.type]}
                        </Badge>
                    </div>

                    {session.meetingUrl && !hideMeetingUrl && (
                        <Button size="sm" variant="outline" asChild className="w-fit gap-2">
                            <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={14} />
                                כניסה לפגישה
                            </a>
                        </Button>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs text-muted-foreground">הערות</span>
                        {editable ? (
                            <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="כתוב הערות במהלך הפגישה..."
                                className="text-sm resize-none"
                                rows={5}
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground italic">אין הערות לפגישה זו</p>
                        )}
                    </div>

                    {editable && (
                        <Button size="sm" className="self-end">
                            שמור הערות
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
