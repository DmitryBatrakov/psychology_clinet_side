import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { SessionDTO } from "@/features/session/model/types";
import type { SpecialistDTO } from "@/features/specialist/model/types";
import { formatSessionDate, formatSessionTime } from "../lib/formatSession";

type SessionCompletedProps = {
    sessionList: SessionDTO[];
    specialistsMap: Map<string, SpecialistDTO>;
};

export function SessionCompleted({
    sessionList,
    specialistsMap,
}: SessionCompletedProps) {

    const now = new Date();
    const completedSessions = sessionList
        .filter((session) => session.status === "completed" && new Date(session.startAt) < now)
        .sort(
            (a, b) =>
                new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
        );

    return (
        <Table dir="rtl">
            <TableCaption>רשימת הפגישות שהסתיימו</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">תאריך</TableHead>
                    <TableHead className="text-center">שעה</TableHead>
                    <TableHead className="text-center">פורמט</TableHead>
                    <TableHead className="text-center">מומחה</TableHead>
                    <TableHead className="text-right">מחיר</TableHead>
                    <TableHead className="text-right">סטטוס</TableHead>
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
                                    ? "אונליין"
                                    : "פרונטלי"}
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
  