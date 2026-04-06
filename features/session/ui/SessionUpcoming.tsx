import type { SessionDTO } from "@/features/session/model/types";
import type { SpecialistDTO } from "@/features/specialist/model/types";
import { formatSessionDate, formatSessionTime } from "../lib/formatSession";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";

type SessionUpcomingProps = {
    sessionList: SessionDTO[];
    specialistsMap: Map<string, SpecialistDTO>;
};

export function SessionUpcoming({
    sessionList,
    specialistsMap,
}: SessionUpcomingProps) {
    if (sessionList.length === 0) {
        return (
            <div className="p-8 text-center text-muted-foreground min-h-[calc(100vh-12rem)] flex flex-col gap-5 justify-center items-center">
                <p className="text-base">אין לך פגישות קרובות.</p>
                <Link href="/catalog" className="py-3 px-4 bg-secondary text-white rounded-lg">קבע פגישה</Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5" dir="rtl">
            {sessionList.map((s) => {
                const specialist = specialistsMap.get(s.specialistId);
                const specialistName = specialist
                    ? `${specialist.firstName} ${specialist.lastName}`
                    : "לא זמין";

                return (
                    <Card key={s.id}>
                        <CardHeader>
                            <CardTitle className="text-center">
                                פגישה קרובה
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-5 sm:grid sm:grid-cols-3">
                                {/* Specialist info */}
                                <div className="flex flex-row sm:flex-col gap-4 justify-start sm:justify-center items-center">
                                    {specialist?.photoUrl ? (
                                        <Image
                                            src={specialist.photoUrl}
                                            alt={specialistName}
                                            width={80}
                                            height={80}
                                            className="rounded-full object-cover shrink-0"
                                        />
                                    ) : (
                                        <CircleUserRound
                                            size={80}
                                            color="purple"
                                            className="shrink-0"
                                        />
                                    )}
                                    <div className="text-right sm:text-center">
                                        <p className="text-lg font-semibold">
                                            {specialistName}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{specialist?.profession ?? "—"}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {specialist?.experience ?? 0} שנות ניסיון
                                        </p>
                                    </div>
                                </div>

                                {/* Date & time */}
                                <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 justify-start sm:justify-center items-start sm:items-center text-sm">
                                    <p>תאריך: {formatSessionDate(s.startAt)}</p>
                                    <p>שעה: {formatSessionTime(s.startAt)}</p>
                                </div>

                                {/* Details */}
                                <div className="flex flex-col gap-2 justify-center items-start text-sm">
                                    <div className="flex gap-2">
                                        <span className="font-medium">נושא:</span>
                                        <span>{s.desription}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-medium">פורמט פגישה:</span>
                                        <span>{s.meetingFormat}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-row sm:flex-col sm:col-start-2 gap-2">
                                    <Button
                                        variant="default"
                                        className="flex-1 sm:flex-none bg-blue-700"
                                    >
                                        הצטרף
                                    </Button>
                                    <Button variant="destructive" className="flex-1 sm:flex-none">
                                        ביטול
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
