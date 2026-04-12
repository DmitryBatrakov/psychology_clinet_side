"use client";

import { useAtomValue } from "jotai";
import { authAtom } from "@/src/store/auth/authAtom";
import { useScheduleDay } from "@/features/schedule-day/hooks/useScheduleDay";
import { formatSessionTime } from "@/features/session/lib/formatSession";
import type { ScheduleDayItem } from "@/features/schedule-day/model/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound, ExternalLink } from "lucide-react";

export function ScheduleDay() {
    const { user, loading: authLoading } = useAtomValue(authAtom);
    const { data, isLoading } = useScheduleDay(user?.uid ?? null, authLoading);

    const items = data?.items ?? [];

    if (isLoading) {
        return <ScheduleDaySkeleton />;
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
                <p className="text-base">На сегодня сессий нет</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {items.map((item) => (
                <ScheduleDayCard key={item.session.id} item={item} />
            ))}
        </div>
    );
}

function ScheduleDayCard({ item }: { item: ScheduleDayItem }) {
    const { session, patient } = item;
    const patientName = `${patient.firstName} ${patient.lastName}`.trim() || "Пациент";
    const initials = `${patient.firstName[0] ?? ""}${patient.lastName[0] ?? ""}`.toUpperCase();

    return (
        <Card>
            <CardContent className="flex items-center gap-3 py-3 px-4 h-19">
                <Avatar className="w-10 h-10 shrink-0">
                    <AvatarImage src={patient.photoUrl ?? undefined} alt={patientName} />
                    <AvatarFallback>
                        {initials || <CircleUserRound size={20} />}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 flex flex-col gap-0.5">
                    <p className="font-semibold text-sm">{patientName}</p>
                    <p className="text-xs text-muted-foreground">
                        {formatSessionTime(session.startAt)}
                        {session.endAt && ` — ${formatSessionTime(session.endAt)}`}
                    </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                    {session.meetingUrl ? (
                        <Button asChild size="sm" className="bg-blue-700 hover:bg-blue-800">
                            <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={14} className="mr-1.5" />
                                Подключиться
                            </a>
                        </Button>
                    ) : (
                        <Button size="sm" className="bg-blue-700 hover:bg-blue-800" disabled>
                            <ExternalLink size={14} className="mr-1.5" />
                            Подключиться
                        </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => {}}>
                        Детали
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function ScheduleDaySkeleton() {
    return (
        <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
                <Card key={i}>
                    <CardContent className="flex items-center gap-3 py-3 px-4">
                        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                        <div className="flex-1 flex flex-col gap-2">
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-8 w-28" />
                        <Skeleton className="h-8 w-20" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
