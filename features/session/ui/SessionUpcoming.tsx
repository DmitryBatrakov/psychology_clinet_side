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
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                <p className="text-sm">אין לך פגישות קרובות.</p>
                אפשרות: <Link href="/catalog">קבע פגישה</Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5  overflow-y-auto" dir="rtl">
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
                            <div className="grid grid-cols-3 gap-5">
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    {specialist?.photoUrl ? (
                                        <Image
                                            src={specialist.photoUrl}
                                            alt={specialistName}
                                            width={100}
                                            height={100}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <CircleUserRound
                                            size={100}
                                            color="purple"
                                        />
                                    )}
                                    <div>
                                        <p className="text-lg font-semibold">
                                            {specialistName}
                                        </p>
                                        <p>{specialist?.profession ?? "—"}</p>
                                        <p>
                                            {specialist?.experience ?? 0} שנות
                                            ניסיון
                                        </p>
                                    </div>
                                </div>
                            <div className=" flex flex-col gap-2 justify-center items-center">
                                <p>תאריך: {formatSessionDate(s.startAt)}</p>
                                <p>שעה: {formatSessionTime(s.startAt)}</p>
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-start">
                                <div className="flex gap-2">
                                    <span>נושא:</span>
                                    <span>{s.desription}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>פורמט פגישה:</span>
                                    <span>{s.meetingFormat}</span>
                                </div>
                            </div>

                            <div className="col-start-2 flex flex-col gap-2">
                                <Button
                                    variant="default"
                                    className=" bg-blue-700"
                                >
                                    הצטרף
                                </Button>
                                <Button variant="destructive" className="">
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
