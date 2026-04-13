import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Item, ItemContent, ItemHeader } from '@/components/ui/item';
import { Avatar } from '@radix-ui/react-avatar';

interface CalendarItemProps {
  workTimeLimit: { start: number; end: number };
  meeting: { name: string; time: [number, number]; color: string };
  index: number;
}

function CalendarItem({ workTimeLimit, meeting, index }: CalendarItemProps) {
  const {
    name,
    time: [s, e],
    color,
  } = meeting;

  const rowStart = (s - workTimeLimit.start) * 2 + 1;
  const rowEnd = (e - workTimeLimit.start) * 2 + 1;
  return (
    <Item
      className="my-1.5 flex h-full max-h-[calc(100%-9px)] shrink-0 cursor-pointer flex-col gap-0 overflow-hidden rounded-sm border-2 border-blue-400 bg-blue-200 p-0 transition-all *:w-full hover:brightness-105"
      style={{
        background: color,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
      }}
    >
      <ItemHeader className="basis-0 justify-start bg-blue-300 p-1">
        <Avatar className="h-5.5 w-5.5 min-w-5.5">
          <AvatarImage className="rounded-full" src={'https://ui.shadcn.com/avatars/shadcn.jpg'} />
          <AvatarFallback className="size-full text-xs">JD</AvatarFallback>
        </Avatar>
        <span className="line-clamp-1 pr-1">{name}</span>
      </ItemHeader>
      <ItemContent className="flex h-fit max-w-full overflow-hidden p-1 text-xs text-gray-700">
        <div className="line-clamp-1 h-fit max-w-full overflow-hidden text-ellipsis">
          <span>
            {String(s).replace('.5', '')}:{s % 1 !== 0 ? '30' : '00'}
          </span>
          <span> — </span>
          <span>
            {String(e).replace('.5', '')}:{e % 1 !== 0 ? '30' : '00'}
          </span>
        </div>
      </ItemContent>
    </Item>
  );
}

export default CalendarItem;
