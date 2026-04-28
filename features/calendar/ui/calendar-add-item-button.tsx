import { ShownDateInterval } from '@/src/app/(specialist)/calendar/page';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Ban, Plus } from 'lucide-react';
import { useContext } from 'react';

function CalendarAddItemButton({
  item: { start, end },
  workTimeLimit,
  date,
}: {
  item: { start: number; end: number };
  workTimeLimit: { start: number; end: number };
  date: Date;
}) {
  const { setter: { setNewSession } } = useContext(ShownDateInterval);
  const rows = workTimeLimit.end - workTimeLimit.start;
  const top = ((start - workTimeLimit.start) / rows) * 100;
  const height = ((end - start) / rows) * 100;

  const sessionStart = new Date(date);
  sessionStart.setHours(start, 0, 0, 0);
  const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const isPast = sessionStart < twoHoursFromNow;

  if (isPast) {
    return (
      <div
        className="group absolute left-0 w-full shrink border-2 border-dashed border-transparent hover:border-gray-300 hover:bg-gray-100 rounded-lg"
        style={{
          top: `calc(${top}% + 3px)`,
          height: `calc(${height}% - 6px)`,
        }}
      >
        <Ban className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-gray-300 opacity-0 transition-all group-hover:opacity-100" />
      </div>
    );
  }

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
      onClick={(e) => setNewSession({ date, startHour: start, endHour: end, name: '', x: e.clientX, y: e.clientY })}
    >
      <Plus className="stroke-green-400 opacity-0 transition-all group-hover:opacity-100" />
    </Button>
  );
}

export default CalendarAddItemButton;
