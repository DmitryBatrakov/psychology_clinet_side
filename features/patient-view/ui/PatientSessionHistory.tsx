import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { SessionDTO } from "@/features/session/model/types";
import { SESSION_TYPE_LABELS, SESSION_STATUS_LABELS } from "@/lib/labels";
import { formatSessionDate, formatSessionTime } from "@/features/session/lib/formatSession";
import { useState } from "react";

type PatientSessionHistoryProps = {
    sessions: SessionDTO[];
};

export function PatientSessionHistory({ sessions }: PatientSessionHistoryProps) {
    const [selectedSession, setSelectedSession] = useState<SessionDTO | null>(null);

    if (sessions.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">היסטוריית פגישות</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-6">
                        אין פגישות עדיין
                    </p>
                </CardContent>
            </Card>
        );
    }

    const sessionSorted = [...sessions]
        .filter(s => s.status === "completed")
        .sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">היסטוריית פגישות</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                    <Table dir="rtl">
                        <TableCaption className="mb-3">רשימת כל הפגישות עם המטופל</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start">תאריך</TableHead>
                                <TableHead className="text-center">שעה</TableHead>
                                <TableHead className="text-center">סוג</TableHead>
                                <TableHead className="text-center">סטטוס</TableHead>
                                <TableHead className="text-end">מחיר</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sessionSorted.map((session) => {
                                const badge = SESSION_STATUS_LABELS[session.status]; 
                                return (
                                    <TableRow
                                        key={session.id}
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() => setSelectedSession(session)}
                                    >
                                        <TableCell className="font-medium">
                                            {formatSessionDate(session.startAt)}
                                        </TableCell>
                                        <TableCell className="text-center" dir="ltr">
                                            {formatSessionTime(session.startAt)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {SESSION_TYPE_LABELS[session.type]}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={badge.variant} className="text-xs">
                                                {badge.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-left">
                                            {session.income > 0 ? `₪${session.income}` : "—"}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={!!selectedSession} onOpenChange={(open) => !open && setSelectedSession(null)}>
                <DialogContent dir="rtl">
                    <DialogHeader>
                        <DialogTitle>פרטי פגישה</DialogTitle>
                    </DialogHeader>
                    {selectedSession && (
                        <div className="space-y-3 text-sm">
                            <Row label="תאריך" value={formatSessionDate(selectedSession.startAt)} />
                            <Row label="שעה" value={formatSessionTime(selectedSession.startAt)} dir="ltr" />
                            <Row label="סוג" value={SESSION_TYPE_LABELS[selectedSession.type]} />
                            <Row            
                                label="סטטוס"
                                value={
                                    <Badge
                                        variant={SESSION_STATUS_LABELS[selectedSession.status].variant}
                                        className="text-xs"
                                    >
                                        {SESSION_STATUS_LABELS[selectedSession.status].label}
                                    </Badge>
                                }
                            />
                            <Row
                                label="מחיר"
                                value={selectedSession.income > 0 ? `₪${selectedSession.income}` : "—"}
                            />
                            <div className="pt-1">
                                <p className="font-medium text-muted-foreground mb-1">הערות</p>
                                <p className="border border-secondary rounded-md p-3 text-muted-foreground min-h-15">
                                    {selectedSession.notes ?? "אין הערות לפגישה זו"}
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

function Row({
    label,
    value,
    dir,
}: {
    label: string;
    value: React.ReactNode;
    dir?: string;
}) {
    return (
        <div className="flex justify-between items-center gap-4">
            <span className="font-medium text-muted-foreground">{label}</span>
            <span dir={dir}>{value}</span>
        </div>
    );
}

export function PatientSessionHistorySkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4 items-center">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-14" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
