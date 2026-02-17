import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { sessionData } from "@/mockData/sessions/sessionData";
import type { SessionDto } from "@/features/session/model/types";
import { formatSessionDate, formatSessionTime } from "../lib/formatSession";

const sessionDataHistory: SessionDto[] = sessionData
    .filter((session) => session.status === "completed")
    .sort(
        (a, b) =>
            new Date(b.startAt).getTime() - new Date(a.startAt).getTime()
    );

export function SessionCompleted() {
    return (
        <Table>
            <TableCaption>List of your completed sessions</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead className="text-center">Time</TableHead>
                    <TableHead className="text-center">Format</TableHead>
                    <TableHead className="text-center">Specialist</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sessionDataHistory.map((session) => (
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
                            {session.income} 
                        </TableCell>
                        <TableCell className="text-right capitalize">
                            {session.status}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
  