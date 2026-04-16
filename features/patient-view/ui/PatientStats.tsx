import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarCheck, CalendarX, Layers, CircleDollarSign } from "lucide-react";
import type { SessionDTO } from "@/features/session/model/types";
import { formatSessionDate } from "@/features/session/lib/formatSession";

type PatientStatsProps = {
    sessions: SessionDTO[];
};

export function PatientStats({ sessions }: PatientStatsProps) {
    const completed = sessions.filter((s) => s.status === "completed");
    const canceled = sessions.filter((s) => s.status === "canceled");
    const totalIncome = completed.reduce((sum, s) => sum + s.income, 0);

    const sortedByDate = [...sessions].sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
    );
    const firstSession = sortedByDate[0];

    const stats = [
        {
            label: "סה״כ פגישות",
            value: sessions.length,
            sub: firstSession ? `מאז ${formatSessionDate(firstSession.startAt)}` : "—",
            icon: <Layers size={30} className="text-primary" />,
        },
        {
            label: "הושלמו",
            value: completed.length,
            sub: `${sessions.length > 0 ? Math.round((completed.length / sessions.length) * 100) : 0}%`,
            icon: <CalendarCheck size={30} className="text-green-500" />,
        },
        {
            label: "בוטלו",
            value: canceled.length,
            sub: `${sessions.length > 0 ? Math.round((canceled.length / sessions.length) * 100) : 0}%`,
            icon: <CalendarX size={30} className="text-destructive" />,
        },
        {
            label: "הכנסה כוללת",
            value: `₪${totalIncome.toLocaleString()}`,
            sub: `${completed.length} פגישות משולמות`,
            icon: <CircleDollarSign size={30} className="text-blue-500" />,
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat) => (
                <Card key={stat.label} className="p-4">
                    <CardContent className="flex flex-col justify-start gap-2 p-0">
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-muted-foreground">{stat.label}</span>
                            {stat.icon}
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-base text-muted-foreground">{stat.sub}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export function PatientStatsSkeleton() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                    <CardContent className="flex flex-col gap-2 p-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-3 w-20" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
