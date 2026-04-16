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
import type { SessionDTO } from "@/features/session/model/types";
import { SESSION_TYPE_LABELS } from "@/features/session/lib/sessionTypeLabels";
import { formatSessionDate, formatSessionTime } from "@/features/session/lib/formatSession";

const STATUS_BADGE: Record<
    SessionDTO["status"],
    { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
    upcoming: { label: "קרובה", variant: "default" },
    completed: { label: "הושלמה", variant: "secondary" },
    canceled: { label: "בוטלה", variant: "destructive" },
};

type PatientSessionHistoryProps = {
    sessions: SessionDTO[];
};

export function PatientSessionHistory({ sessions }: PatientSessionHistoryProps) {
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

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">היסטוריית פגישות</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table dir="rtl">
                    <TableCaption className="mb-3">רשימת כל הפגישות עם המטופל</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>תאריך</TableHead>
                            <TableHead className="text-center">שעה</TableHead>
                            <TableHead className="text-center">סוג</TableHead>
                            <TableHead className="text-center">סטטוס</TableHead>
                            <TableHead className="text-left">מחיר</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...sessions].sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime()).map((session) => {
                            const badge = STATUS_BADGE[session.status];
                            return (
                                <TableRow key={session.id}>
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
