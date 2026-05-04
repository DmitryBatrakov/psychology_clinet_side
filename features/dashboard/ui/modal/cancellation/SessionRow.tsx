import { ChevronRight } from 'lucide-react';
import { SESSION_TYPE_LABELS } from '@/lib/labels';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScheduleDayItem } from '@/features/dashboard/model/types';
import { formatTimeRange } from '@/features/dashboard/lib/cancellationHelpers';

interface Props {
    item: ScheduleDayItem;
    onClick: () => void;
}

export function SessionRow({ item, onClick }: Props) {

    const { session, patient } = item;

    return (
        <button
            onClick={onClick}
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent/50"
        >
            <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={patient.photoUrl ?? undefined} />
                <AvatarFallback>{patient.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col items-start">
                <span className="font-medium text-foreground">
                    {patient.firstName} {patient.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                    {SESSION_TYPE_LABELS[session.type]}
                </span>
            </div>
            <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
                {formatTimeRange(session.startAt, session.endAt)}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground rotate-180" />
        </button>
    );
}
