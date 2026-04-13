import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { authAtom } from "@/src/store/auth/authAtom";
import { useScheduleDay } from "@/features/dashboard/hooks/useScheduleDay";
import { formatSessionTime } from "@/features/session/lib/formatSession";
import { findNextSession } from "@/features/dashboard/lib/findNextSession";
import { useTimeUntil } from "@/features/dashboard/lib/useTimeUntil";
import { getDisplayTimes } from "@/features/dashboard/lib/sessionDisplayTime";
import { CircleUserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function NextSessionBody() {
    const { user, loading: authLoading } = useAtomValue(authAtom);
    const { data, isLoading } = useScheduleDay(user?.uid ?? null, authLoading);

    const next = findNextSession(data?.items);

    const timeUntil = useTimeUntil(next?.session?.startAt, next?.session?.endAt, next?.session?.status);

    if (isLoading) {
        return <NextSessionSkeleton />;
    }

    if (!next) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
                <p className="text-sm">אין פגישות קרובות</p>
            </div>
        );
    }

    const { session, patient } = next;
    const patientName = `${patient.firstName} ${patient.lastName}`.trim() || "מטופל";
    const initials = `${patient.firstName[0] ?? ""}${patient.lastName[0] ?? ""}`.toUpperCase();
    const isOnline = session.meetingFormat === "online";
    const [displayStart, displayEnd] = getDisplayTimes(session.startAt, session.endAt);

    return (
        <div className="flex flex-col gap-4 h-full justify-center w-full">

            <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 shrink-0">
                    <AvatarImage src={patient.photoUrl ?? undefined} alt={patientName} />
                    <AvatarFallback>
                        {initials || <CircleUserRound size={20} />}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="font-semibold text-base truncate">{patientName}</p>
                    <p className="text-sm text-muted-foreground" dir="ltr">
                        {formatSessionTime(displayStart)}
                        {displayEnd && ` — ${formatSessionTime(displayEnd)}`}
                    </p>
                </div>
                {timeUntil && (
                    <Badge className="ml-auto text-xs font-medium text-muted-foreground whitespace-nowrap">
                        {timeUntil}
                    </Badge>
                )}
            </div>

            <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                    פרטים
                </Button>
                {isOnline && session.meetingUrl && (
                    <Button size="sm" className="flex-1" asChild>
                        <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer">
                            כניסה
                        </a>
                    </Button>
                )}
            </div>
        </div>
    );
}

export function NextSessionSkeleton() {
    return (
        <div className="flex flex-col gap-4 h-full justify-between">
            <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-4 w-14" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
            </div>
        </div>
    );
}
