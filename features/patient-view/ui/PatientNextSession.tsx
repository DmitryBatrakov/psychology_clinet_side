import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Clock } from "lucide-react";
import type { SessionDTO } from "@/features/session/model/types";
import { SESSION_TYPE_LABELS } from "@/features/session/lib/sessionTypeLabels";
import { formatSessionDate, formatSessionTime } from "@/features/session/lib/formatSession";

type PatientNextSessionProps = {
    sessions: SessionDTO[];
};

export function PatientNextSession({ sessions }: PatientNextSessionProps) {
    const now = new Date();
    const next = sessions
        .filter((s) => s.status === "upcoming" && new Date(s.startAt) > now)
        .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())[0];

    if (!next) {
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
        <Card>
            <CardHeader>
                <CardTitle className="text-base">פגישה קרובה</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
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

                {next.meetingUrl && (
                    <Button size="sm" asChild>
                        <a href={next.meetingUrl} target="_blank" rel="noopener noreferrer">
                            כניסה לפגישה
                        </a>
                    </Button>
                )}
            </CardContent>
        </Card>
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
