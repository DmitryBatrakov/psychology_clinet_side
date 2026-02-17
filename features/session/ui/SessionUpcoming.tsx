import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { sessionData } from "@/mockData/sessions/sessionData";
import type { SessionDto } from "@/features/session/model/types";
import { formatSessionDate, formatSessionTime } from "../lib/formatSession";
import Link from "next/link";

const upcomingSessions: SessionDto[] = sessionData
    .filter((session) => session.status === "upcoming")
    .sort(
        (a, b) =>
            new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );

function handleCancel(sessionId: string) {
    void sessionId;
    // TODO: cancel session
}

export function SessionUpcoming() {
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
        <Table>
            <TableCaption>Upcoming sessions</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead className="text-center">Time</TableHead>
                    <TableHead className="text-center">Format</TableHead>
                    <TableHead className="text-center">Specialist</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {upcomingSessions.map((session) => (
                    <TableRow key={session.id}>
                        <TableCell className="font-medium">
                            {formatSessionDate(session.startAt)}
                        </TableCell>
                        <TableCell className="text-center">
                            {formatSessionTime(session.startAt)}
                        </TableCell>
                        <TableCell className="text-center capitalize">
                            {session.meetingFormat === "online"
                                ? "Онлайн"
                                : "Офлайн"}
                        </TableCell>
                        <TableCell className="text-center">
                            {session.specialistId}
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                {session.meetingFormat === "online" &&
                                    session.meetingUrl && (
                                        <Button variant="outline" size="sm" asChild className="bg-green-400 text-white">
                                            <Link
                                                href={session.meetingUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Connect
                                            </Link>
                                        </Button>
                                    )}
                                <Button
                                    className="bg-red-400 text-white"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCancel(session.id)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
