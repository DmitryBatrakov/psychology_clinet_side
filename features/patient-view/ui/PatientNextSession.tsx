"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Clock, Radio, NotebookPen } from "lucide-react";
import type { SessionDTO } from "@/features/session/model/types";
import { SESSION_TYPE_LABELS } from "@/features/session/lib/sessionTypeLabels";
import { formatSessionDate, formatSessionTime } from "@/features/session/lib/formatSession";
import { SessionInfoDialog } from "./SessionInfoDialog";

type PatientNextSessionProps = {
    sessions: SessionDTO[];
};

export function PatientNextSession({ sessions }: PatientNextSessionProps) {
    const now = new Date();
    const [prevOpen, setPrevOpen] = useState(false);
    const [nextOpen, setNextOpen] = useState(false);
    const [currentOpen, setCurrentOpen] = useState(false);

    const current = sessions.find(
        (s): s is typeof s & { endAt: string } =>
            s.status === "upcoming" &&
            new Date(s.startAt) <= now &&
            !!s.endAt &&
            new Date(s.endAt) >= now
    );

    const next = sessions
        .filter((s) => s.status === "upcoming" && new Date(s.startAt) > now)
        .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())[0];

    const prev = sessions
        .filter((s): s is typeof s & { endAt: string } => s.status === "completed" && !!s.endAt && new Date(s.endAt) < now)
        .sort((a, b) => new Date(b.endAt).getTime() - new Date(a.endAt).getTime())[0];

    if (!next && !current) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">פגישה קרובה</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-4">
                        אין פגישות קרובות עם מטופל זה
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-3 w-full">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-base">פגישה קודמת</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        {prev ? (
                            <>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CalendarDays size={15} className="text-muted-foreground shrink-0" />
                                        <span>{formatSessionDate(prev.startAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock size={15} className="text-muted-foreground shrink-0" />
                                        <span dir="ltr">{formatSessionTime(prev.startAt)}</span>
                                    </div>
                                    <Badge variant="outline" className="w-fit text-xs">
                                        {SESSION_TYPE_LABELS[prev.type]}
                                    </Badge>
                                </div>

                                <Button variant="outline" size="sm" className="w-fit" onClick={() => setPrevOpen(true)}>
                                    View notes
                                </Button>

                                <SessionInfoDialog
                                    open={prevOpen}
                                    onOpenChange={setPrevOpen}
                                    title="פגישה קודמת"
                                    session={prev}
                                    hideMeetingUrl
                                />
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                אין פגישות קודמות עם מטופל זה
                            </p>
                        )}
                    </CardContent>
                </Card>
                {current && (
                    <Card className="w-full border-green-500/50 bg-green-500/5">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Radio size={15} className="text-green-500 shrink-0" />
                                פגישה מתנהלת עכשיו
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <CalendarDays size={15} className="text-muted-foreground shrink-0" />
                                    <span>{formatSessionDate(current.startAt)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock size={15} className="text-muted-foreground shrink-0" />
                                    <span dir="ltr">{formatSessionTime(current.startAt)}</span>
                                </div>
                                <Badge variant="outline" className="w-fit text-xs">
                                    {SESSION_TYPE_LABELS[current.type]}
                                </Badge>
                            </div>

                            <div className="flex gap-2 justify-between">
                                <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setCurrentOpen(true)}>
                                    <NotebookPen size={14} />
                                    {current.notes ? "ערוך הערות" : "הוסף הערות"}
                                </Button>
                                {current.meetingUrl && (
                                    <Button size="sm" asChild>
                                        <a href={current.meetingUrl} target="_blank" rel="noopener noreferrer">
                                            כניסה לפגישה
                                        </a>
                                    </Button>
                                )}
                            </div>

                            <SessionInfoDialog
                                open={currentOpen}
                                onOpenChange={setCurrentOpen}
                                title="פגישה מתנהלת עכשיו"
                                session={current}
                                editable
                                hideMeetingUrl
                            />
                        </CardContent>
                    </Card>
                )}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-base">פגישה הבאה</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        {next ? (
                            <>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CalendarDays size={15} className="text-muted-foreground shrink-0" />
                                        <span>{formatSessionDate(next.startAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock size={15} className="text-muted-foreground shrink-0" />
                                        <span dir="ltr">{formatSessionTime(next.startAt)}</span>
                                    </div>
                                    <Badge variant="outline" className="w-fit text-xs">
                                        {SESSION_TYPE_LABELS[next.type]}
                                    </Badge>
                                </div>

                                <SessionInfoDialog
                                    open={nextOpen}
                                    onOpenChange={setNextOpen}
                                    title="פגישה הבאה"
                                    session={next}
                                    hideMeetingUrl
                                />
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                אין פגישות קרובות עם מטופל זה
                            </p>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

export function PatientNextSessionSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </CardContent>
        </Card>
    );
}
