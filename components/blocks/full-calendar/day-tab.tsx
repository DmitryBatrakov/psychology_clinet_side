import { Item, ItemContent, ItemHeader } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { format, getDate, isSameDay } from 'date-fns';
import { useContext, useMemo } from 'react';
import CalendarItem from './calendar-item';
import { cn } from '@/lib/utils';
import { getGaps } from './halpers';
import CalendarAddItemButton from './calendar-add-item-button';
import { Schedule, ShownDateInterval } from '@/src/app/(specialist)/calendar/page';

interface Props {
  schedule: Schedule;
  workTimeLimit: { start: number; end: number };
}

function DayTab({ workTimeLimit, schedule }: Props) {
  const {
    getter: { shownInterval },
  } = useContext(ShownDateInterval);

  const rows = useMemo(() => workTimeLimit.end - workTimeLimit.start, [workTimeLimit]);

  const daySchedule = useMemo(() => {
    const dateKey = format(shownInterval, 'yyyy-MM-dd');
    return schedule.filter((item) => item.date === dateKey);
  }, [shownInterval]);

  // console.log(daySchedule);

  return (
    <TabsContent value="day" className="flex h-full min-h-0">
      <ItemContent className="flex h-full flex-col gap-0">
        <section className="grid grid-cols-[46px_1fr] grid-rows-1 px-3 pt-3">
          <div />
          <button
            className={cn(
              'bg-accent flex h-8 w-full justify-center gap-1 rounded-t-lg p-2 *:w-full',
              isSameDay(shownInterval, new Date()) && 'bg-blue-500 text-white hover:bg-blue-600'
            )}
          >
            {format(shownInterval, 'EEEE')}
          </button>
        </section>

        <div className="custom-scrollbar h-full overflow-y-scroll pt-1 pr-0.5 pb-3 pl-3">
          <section className="grid min-h-full grid-cols-[46px_1fr] grid-rows-1">
            <div
              className="grid -translate-y-1.75 grid-cols-1 items-start justify-between pr-2 text-center"
              style={{
                gridTemplateRows: `repeat(${rows - 1}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: rows }).map((_, index) => (
                <div key={`time-slot-${index}`} className="text-xs text-gray-500">
                  {index + workTimeLimit.start}:00
                </div>
              ))}
            </div>

            <div className="relative grid h-full min-h-0 w-full">
              <div
                className="z-10 grid size-full min-h-0 pb-3.5"
                style={{
                  gridTemplateRows: `repeat(${(rows - 1) * 2}, minmax(0, 1fr))`,
                }}
              >
                {daySchedule.map((meeting, index) => (
                  <CalendarItem
                    key={`calendar-item-day-${index}`}
                    workTimeLimit={workTimeLimit}
                    meeting={meeting}
                    index={index}
                  />
                ))}

                {getGaps({
                  meetings: daySchedule,
                  workTimeLimit: workTimeLimit,
                }).map((gap, gapIndex) => (
                  <CalendarAddItemButton
                    item={gap}
                    workTimeLimit={workTimeLimit}
                    key={`calendar-add-item-${gapIndex}`}
                  />
                ))}
              </div>

              <div
                className="absolute grid size-full min-h-0 pb-3.5"
                style={{
                  gridTemplateRows: `repeat(${(rows - 1) * 2}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: rows * 2 }).map((_, index) => (
                  <Separator
                    key={`hour-separator-${index}`}
                    className={cn('bg-accent h-0.5!', index % 2 !== 0 && 'h-px!')}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </ItemContent>
    </TabsContent>
  );
}

export default DayTab;
