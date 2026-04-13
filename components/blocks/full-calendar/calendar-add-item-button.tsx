import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

function CalendarAddItemButton({
  item: { start, end },
  workTimeLimit,
}: {
  item: { start: number; end: number };
  workTimeLimit: { start: number; end: number };
}) {
  const rowStart = (start - workTimeLimit.start) * 2 + 1;
  const rowEnd = (end - workTimeLimit.start) * 2 + 1;
  return (
    <Button
      variant={'ghost'}
      className={cn(
        'group dur row-span-1 my-1.5 h-[calc(100%-9px)] shrink cursor-pointer border-2 border-dashed border-transparent hover:border-green-400 hover:bg-emerald-50',
        (end - start) % 1 !== 0 ? 'row-span-2' : 'row-span-1'
      )}
      style={{
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
      }}
    >
      <Plus className="stroke-green-400 opacity-0 transition-all group-hover:opacity-100" />
    </Button>
  );
}

export default CalendarAddItemButton;
