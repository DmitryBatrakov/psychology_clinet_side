"use client";

import { useAtomValue } from "jotai";
import { authAtom } from "@/src/store/auth/authAtom";
import { useScheduleDay } from "@/features/dashboard/hooks/useScheduleDay";
import { formatSessionTime } from "@/features/session/lib/formatSession";
import { resolveSessionState, SESSION_BADGE } from "@/features/dashboard/lib/sessionState";
import { getDisplayTimes } from "@/features/dashboard/lib/sessionDisplayTime";
import type { ScheduleDayItem } from "@/features/dashboard/model/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CircleUserRound, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ScheduleDayBody() {
    const { user, loading: authLoading } = useAtomValue(authAtom);
    const { data, isLoading } = useScheduleDay(user?.uid ?? null, authLoading);

    const items = data?.items ?? [];

    if (isLoading) {
        return <ScheduleDaySkeleton />;
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-2 w-full h-full">
                <Badge className="text-sm text-foreground bg-primary">אין פגישות להיום</Badge>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            {items.map((item) => (
                <ScheduleDayCard key={item.session.id} item={item} />
            ))}
        </div>
    );
}

function ScheduleDayCard({ item }: { item: ScheduleDayItem }) {
    const { session, patient } = item;
    const patientName = `${patient.firstName} ${patient.lastName}`.trim() || "מטופל";
    const initials = `${patient.firstName[0] ?? ""}${patient.lastName[0] ?? ""}`.toUpperCase();
    const [isCardOpen, setIsCardOpen] = useState<string | null>(null);

    const state = resolveSessionState(session.status, session.startAt, session.endAt);
    const isBlocked = state === "completed" || state === "canceled" || state === "past";
    const [displayStart, displayEnd] = getDisplayTimes(session.startAt, session.endAt);

    const handleCardClick = () => {
        setIsCardOpen((prev) => (prev === item.session.id ? null : item.session.id));
    };

    return (
        <Card
            onClick={handleCardClick}
            className={cn(
                "cursor-pointer duration-300 transition-all ease-in-out hover:scale-98",
                isBlocked && "opacity-60",
            )}
        >
            <CardContent className="flex flex-col py-1 px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9 shrink-0">
                            <AvatarImage src={patient.photoUrl ?? undefined} alt={patientName} />
                            <AvatarFallback>
                                {initials || <CircleUserRound size={18} />}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <p className="font-semibold text-sm truncate">{patientName}</p>
                            <p className="text-xs text-muted-foreground" dir="ltr">
                                {formatSessionTime(displayStart)}
                                {displayEnd && ` — ${formatSessionTime(displayEnd)}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {state !== "upcoming" && (
                            <Badge variant={SESSION_BADGE[state].variant} className="text-xs shrink-0">
                                {SESSION_BADGE[state].label}
                            </Badge>
                        )}
                        <div className={cn("flex items-center justify-center duration-300 transition-all", isCardOpen ? "rotate-180" : "rotate-0")}>
                            <ChevronDown />
                        </div>
                    </div>
                </div>
                <div className={`grid transition-all duration-300 ease-in-out ${isCardOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                        <div className="flex gap-2 pt-3 pb-1">
                            <Button size="sm" variant="outline" className="flex-1" asChild>
                                <Link href={`/patient-view/${patient.id}`}>פרטים</Link>
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                className="flex-1"
                                disabled={isBlocked}
                                onClick={(e) => e.stopPropagation()}
                            >
                                ביטול
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function ScheduleDaySkeleton() {
    return (
        <div className="flex flex-col gap-2 w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                    <CardContent className="flex items-center gap-3 py-6 px-4 w-full">
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
