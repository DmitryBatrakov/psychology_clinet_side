import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { SessionDto } from "@/features/session/model/types";
import type { SpecialistDTO } from "@/features/specialist/model/types";
import { formatSessionDate, formatSessionTime } from "../lib/formatSession";

type SessionCompletedProps = {
    sessionData: SessionDto[];
    specialistsMap: Map<string, SpecialistDTO>;
};

export function SessionCompleted({
    sessionData,
    specialistsMap,
}: SessionCompletedProps) {
    const now = new Date();
    const completedSessions = sessionData
        .filter((session) => session.status === "completed" && new Date(session.startAt) < now)
        .sort(
            (a, b) =>
                new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
        );

    return (
        <Table dir="rtl">
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
                {completedSessions.map((session) => {
                    const specialist = specialistsMap.get(session.specialistId);
                    const specialistName = specialist
                        ? `${specialist.firstName} ${specialist.lastName}`
                        : session.specialistId;
                    return (
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
                                {specialistName}
                            </TableCell>
                            <TableCell className="text-right">
                                {session.income}
                            </TableCell>
                            <TableCell className="text-right capitalize">
                                {session.status}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
  