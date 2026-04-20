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
  const rows = workTimeLimit.end - workTimeLimit.start;
  const top = ((start - workTimeLimit.start) / rows) * 100;
  const height = ((end - start) / rows) * 100;

  return (
    <Button
      variant={'ghost'}
      className={cn(
        'group absolute left-0 w-full shrink cursor-pointer border-2 border-dashed border-transparent hover:border-green-400 hover:bg-emerald-50'
      )}
      style={{
        top: `calc(${top}% + 3px)`,
        height: `calc(${height}% - 6px)`,
      }}
    >
      <Plus className="stroke-green-400 opacity-0 transition-all group-hover:opacity-100" />
    </Button>
  );
}

export default CalendarAddItemButton;
