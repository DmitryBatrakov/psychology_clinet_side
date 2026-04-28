import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Item, ItemContent, ItemHeader } from '@/components/ui/item';
import { getSessionColor } from '@/features/calendar/lib/sessionColors';
import { SESSION_TYPE_LABELS } from '@/features/specialist/model/specialistLabels';
import { SessionType } from '@/features/specialist/model/types';
import { Avatar } from '@radix-ui/react-avatar';

interface CalendarItemProps {
    workTimeLimit: { start: number; end: number };
    meeting: { name: string; time: [number, number]; status?: string; type: SessionType };
    columnIndex: number;
    totalColumns: number;
    onClick?: () => void;
    isSelected?: boolean;
}

function CalendarItem({ workTimeLimit, meeting, columnIndex, totalColumns, onClick, isSelected }: CalendarItemProps) {
    const {
        name,
        time: [s, e],
        status,
        type,
    } = meeting;

    const { bg, header, accent } = getSessionColor(type);

    const isPending = status === 'pending';
    const isCompleted = status === 'completed';
    const isCanceled = status === 'canceled';
    const rows = workTimeLimit.end - workTimeLimit.start;
    const top = ((s - workTimeLimit.start) / rows) * 100;
    const height = ((e - s) / rows) * 100;
    const left = (columnIndex / totalColumns) * 100;
    const width = (1 / totalColumns) * 100;

    return (
        <Item
            onClick={onClick}
            className={`absolute flex shrink-0 cursor-pointer flex-col gap-0 overflow-hidden rounded-sm bg-blue-200 p-0 transition-all *:w-full ${isPending ? 'border-2 border-red-700' : 'border-0'} ${isCompleted ? 'grayscale-60 opacity-100' : ''} ${isCanceled ? 'grayscale-60 brightness-75' : ''} ${isSelected ? "brightness-110" : "brightness-95 hover:brightness-110"}`}
            style={{
                background: bg,
                opacity: isPending ? 0.80 : undefined,
                top: `calc(${top}% + 3px)`,
                height: `calc(${height}% - 6px)`,
                left: `calc(${left}% + 1px)`,
                width: `calc(${width}% - 2px)`,
                ...(isSelected ? { boxShadow: `0 0 0 2px ${accent}` } : {}),
            }}
        >
            <ItemHeader className="basis-0 justify-start p-1" style={{ background: header }}>
                <Avatar className="h-5.5 w-5.5 min-w-5.5">
                    <AvatarImage className="rounded-full" src={'https://ui.shadcn.com/avatars/shadcn.jpg'} />
                    <AvatarFallback className="size-full text-xs">JD</AvatarFallback>
                </Avatar>
                <span className="line-clamp-1 pr-1">{name}</span>
            </ItemHeader>
            <ItemContent className="flex h-fit max-w-full overflow-hidden p-1 text-xs text-gray-700 relative items-start justify-start">
                <span className="line-clamp-1 h-fit max-w-full overflow-hidden text-ellipsis">
                    {s}:00 — {e}:00
                </span>
                <span className="line-clamp-1 h-fit max-w-full overflow-hidden text-ellipsis">
                    {SESSION_TYPE_LABELS[type]}
                </span>
            {isCompleted && (
                <Badge className="absolute bottom-1 left-1 bg-emerald-600 w-auto z-50">הושלם</Badge>
            )}
            {isCanceled && (
                <Badge className="absolute bottom-1 left-1 bg-red-500 w-auto z-50">מבוטל</Badge>
            )}
            </ItemContent>
            {isCanceled && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.5) 4px)' }}
                />
            )}
            {isPending && (
                <div className="absolute bottom-0 right-0 bg-red-700 w-full text-start text-white text-[10px] px-2 py-1 font-semibold leading-tight pointer-events-none">
                    ממתין לאישור ממטופל
                </div>
            )}
        </Item>
    );
}

export default CalendarItem;
