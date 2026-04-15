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
    const getSpecialistName = (specialistId: string) => {
        const s = specialistsMap.get(specialistId);
        return s ? `${s.firstName} ${s.lastName}` : "—";
    };

    if (sessionList.length === 0) {
        return (
            <div className="p-8 text-center text-muted-foreground min-h-[calc(100vh-12rem)] flex flex-col gap-5 justify-center items-center">
                <p className="text-base">אין לך פגישות שהסתיימו.</p>
            </div>
        );
    }

    return (
        <Table dir="rtl">
            <TableCaption>רשימת הפגישות שהסתיימו</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">תאריך</TableHead>
                    <TableHead className="text-center">שעה</TableHead>
                    <TableHead className="text-center">פורמט</TableHead>
                    <TableHead className="text-center">מומחה</TableHead>
                    <TableHead className="text-right">מחיר</TableHead>
                    <TableHead className="text-right">סטטוס</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sessionList.map((session) => (
                    <TableRow key={session.id}>
                        <TableCell className="font-medium">
                            {formatSessionDate(session.startAt)}
                        </TableCell>
                        <TableCell className="text-center">
                            {formatSessionTime(session.startAt)}
                        </TableCell>
                        <TableCell className="text-center">
                            {getSpecialistName(session.specialistId)}
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

