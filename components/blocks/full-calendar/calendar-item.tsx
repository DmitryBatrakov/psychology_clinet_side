import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemContent, ItemHeader } from "@/components/ui/item";
import { Avatar } from "@radix-ui/react-avatar";

interface CalendarItemProps {
    workTimeLimit: { start: number; end: number };
    meeting: { name: string; time: [number, number]; color: string };
    columnIndex: number;
    totalColumns: number;
    onClick?: () => void;
    isSelected?: boolean;
}

function CalendarItem({
    workTimeLimit,
    meeting,
    columnIndex,
    totalColumns,
    onClick,
    isSelected,
}: CalendarItemProps) {
    const {
        name,
        time: [s, e],
        color,
    } = meeting;

    const rows = workTimeLimit.end - workTimeLimit.start;
    const top = ((s - workTimeLimit.start) / rows) * 100;
    const height = ((e - s) / rows) * 100;
    const left = (columnIndex / totalColumns) * 100;
    const width = (1 / totalColumns) * 100;

    console.log("colorc", color);

    return (
        <Item
            onClick={onClick}
            className={`absolute flex shrink-0 cursor-pointer flex-col gap-0 overflow-hidden rounded-sm bg-blue-200 p-0 transition-all *:w-full border-0 ${isSelected ? "brightness-110" : "brightness-95 hover:brightness-110"}`}
            style={{
                background: color,
                top: `calc(${top}% + 3px)`,
                height: `calc(${height}% - 6px)`,
                left: `calc(${left}% + 1px)`,
                width: `calc(${width}% - 2px)`,
                ...(isSelected
                    ? {
                          boxShadow: `0 0 0 2px ${color} `,
                      }
                    : {}),
            }}
        >
            <ItemHeader className="basis-0 justify-start bg-blue-300 p-1">
                <Avatar className="h-5.5 w-5.5 min-w-5.5">
                    <AvatarImage
                        className="rounded-full"
                        src={"https://ui.shadcn.com/avatars/shadcn.jpg"}
                    />
                    <AvatarFallback className="size-full text-xs">
                        JD
                    </AvatarFallback>
                </Avatar>
                <span className="line-clamp-1 pr-1">{name}</span>
            </ItemHeader>
            <ItemContent className="flex h-fit max-w-full overflow-hidden p-1 text-xs text-gray-700">
                <div className="line-clamp-1 h-fit max-w-full overflow-hidden text-ellipsis">
                    {s}:00 — {e}:00
                </div>
            </ItemContent>
        </Item>
    );
}

export default CalendarItem;
