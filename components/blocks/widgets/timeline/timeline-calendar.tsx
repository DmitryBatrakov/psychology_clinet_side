'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ItemContent } from '@/components/ui/item';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ScanEye } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Props {
  isResizing: boolean;
  selected?: Date | undefined;
  onSelect?: (d: Date | undefined) => void;
}

function TimelineCalendar({ isResizing, onSelect, selected }: Props) {
  const [month, setMonth] = useState<Date>(new Date());

  return (
    <ItemContent
      className={cn('h-full min-h-0 overflow-hidden', isResizing && 'blur-xs grayscale-100')}
    >
      <Calendar
        fixedWeeks
        mode="single"
        month={month}
        showOutsideDays
        selected={selected}
        onSelect={onSelect}
        onMonthChange={setMonth}
        components={{
          DayButton: (props) => {
            const workload = useMemo(() => Math.round(Math.random() * 100), []);

            return (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    {...props}
                    className={cn(
                      'hover:bg-accent hover:[&>span]:bg-accent relative h-full w-full cursor-pointer flex-col gap-0 overflow-hidden bg-white text-black',
                      props.modifiers.selected && 'shadow-[inset_0_0_5px_1px] shadow-black/10',
                      props.modifiers.outside && 'opacity-50',
                      props.modifiers.today && 'bg-accent [&>span]:bg-accent'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-1 left-1 opacity-0',
                        props.modifiers.selected && 'opacity-100'
                      )}
                    >
                      <ScanEye className="size-3.5" />
                    </span>

                    <span className="relative z-10 bg-white px-1 transition-all">
                      {format(props.day.date, 'd')}
                    </span>
                    <Progress
                      value={workload}
                      className={cn(
                        'absolute h-1 w-[40%] translate-y-3 *:bg-transparent *:bg-linear-to-r *:from-white *:from-50% *:to-emerald-600',
                        workload >= 33 && ':from-50% *:from-amber-200 *:to-amber-600',
                        workload >= 66 && ':from-0% *:from-red-300 *:to-red-600'
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="pointer-events-none">
                  Meetings - {Math.round(workload / 10)}
                </TooltipContent>
              </Tooltip>
            );
          },
        }}
        className="h-full w-full p-0 **:aspect-auto"
        classNames={{
          month_grid: 'h-full flex flex-col gap-2',
          weekdays: 'flex',
          month: 'flex flex-col w-full gap-2',
          weeks: 'flex flex-wrap gap-1 h-full ',
          week: 'flex w-full m-0 gap-1',
          table: 'h-full flex flex-wrap ',
          day: 'flex w-full h-full rounded-none justify-center items-center rounded-sm',
        }}
      />
    </ItemContent>
  );
}

export default TimelineCalendar;
