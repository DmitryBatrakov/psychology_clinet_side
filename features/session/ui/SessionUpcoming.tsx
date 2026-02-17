import type { SessionDto } from "@/features/session/model/types";
import type { SpecialistDTO } from "@/features/specialist/model/types";
import { formatSessionDate, formatSessionTime } from "../lib/formatSession";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";

type SessionUpcomingProps = {
    sessionData: SessionDto[];
    specialistsMap: Map<string, SpecialistDTO>;
};

export function SessionUpcoming({
    sessionData,
    specialistsMap,
}: SessionUpcomingProps) {
    const now = new Date();
    const upcomingSessions = sessionData
        .filter((s) => s.status === "upcoming" && new Date(s.startAt) > now)
        .sort(
            (a, b) =>
                new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
        );

    if (upcomingSessions.length === 0) {
        return (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                <p className="text-sm">
                    You don`t have any upcoming sessions yet.
                </p>
                Optional: <Link href="/catalog">Book a session</Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5  overflow-y-auto" dir="rtl">
            {upcomingSessions.map((s) => {
                const specialist = specialistsMap.get(s.specialistId);
                const specialistName = specialist
                    ? `${specialist.firstName} ${specialist.lastName}`
                    : s.specialistId;
                return (
                    <Card key={s.id}>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Upcomig Session
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
                                        <p>{specialist?.profession}</p>
                                        <p>
                                            {specialist?.experience} years of
                                            experience
                                        </p>
                                    </div>
                                </div>
                                <div className=" flex flex-col gap-2 justify-center items-center">
                                    <p>Date: {formatSessionDate(s.startAt)}</p>
                                    <p>Time: {formatSessionTime(s.startAt)}</p>
                                </div>
                                <div className="flex flex-col gap-2 justify-center items-left">
                                    <div className="flex gap-2">
                                        <span>Theme:</span>
                                        <span>{s.desription}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Meeting format:</span>
                                        <span>{s.meetingFormat}</span>
                                    </div>
                                </div>

                                <div className="col-start-2 flex flex-col gap-2">
                                    <Button
                                        variant="default"
                                        className=" bg-blue-700"
                                    >
                                        Join
                                    </Button>
                                    <Button variant="destructive" className="">
                                        Cancel
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
