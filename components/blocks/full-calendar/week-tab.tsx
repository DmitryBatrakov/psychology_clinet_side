import { Schedule, ShownDateInterval } from '@/src/app/(specialist)/calendar/page';
import CalendarItem from '@/components/blocks/full-calendar/calendar-item';
import { Button } from '@/components/ui/button';
import { ItemContent } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { eachDayOfInterval, endOfWeek, format, isSameDay, startOfWeek } from 'date-fns';
import { useContext, useMemo } from 'react';
import CalendarAddItemButton from './calendar-add-item-button';
import { getGaps, getWeekDates } from './halpers';

interface Props {
  schedule: Schedule;
  workTimeLimit: { start: number; end: number };
}

function WeekTab({ workTimeLimit, schedule }: Props) {
  const {
    getter: { shownInterval },
    setter: { setShownInterval, setCurrTab },
  } = useContext(ShownDateInterval);

  const rows = useMemo(() => workTimeLimit.end - workTimeLimit.start, [workTimeLimit]);

  const weekDates = useMemo(() => getWeekDates(shownInterval), [shownInterval]);
  const weekSchedule = useMemo(() => {
    const result: Record<string, typeof schedule> = {};
    weekDates.forEach((date) => {
      const dateKey = format(date, 'yyyy-MM-dd');
      result[dateKey] = schedule.filter((item) => item.date === dateKey);
    });
    return result;
  }, [weekDates]);

  return (
    <TabsContent value="week" className="flex h-full min-h-0">
      <ItemContent className="flex h-full flex-col gap-0">
        <section className="grid grid-cols-[46px_1fr] grid-rows-1 px-3 pt-3">
          <div />
          <div className="flex w-full gap-1 *:w-full">
            {weekDates.map((day, index) => (
              <Button
                size={'sm'}
                variant={'secondary'}
                key={`week-day-${index}`}
                onClick={() => {
                  setCurrTab('day');
                  setShownInterval(day);
                }}
                className={cn(
                  'shrink cursor-pointer rounded-b-none border-b border-none border-gray-300 py-2 hover:brightness-95',
                  isSameDay(day, new Date()) && 'bg-blue-500 text-white hover:bg-blue-600'
                )}
              >
                <span className="">{format(day, 'dd')}</span>
                <span className="pt-0.5 text-xs font-light uppercase">{format(day, 'EEE')}</span>
              </Button>
            ))}
          </div>
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

            <div className="relative grid h-full min-h-0 w-full grid-cols-7 gap-1">
              {Object.values(weekSchedule).map((meetings, index) => (
                <div
                  key={`calendar-day-column-${index}`}
                  className="z-10 grid h-[calc(100%-16px)] min-h-0 grid-cols-1"
                  style={{
                    gridTemplateRows: `repeat(${(rows - 1) * 2}, minmax(0, 1fr))`,
                  }}
                >
                  {meetings.map((meeting, index) => (
                    <CalendarItem
                      key={`calendar-item-week-${index}`}
                      workTimeLimit={workTimeLimit}
                      meeting={meeting as any}
                      index={index}
                    />
                  ))}
                  {getGaps({
                    meetings: meetings,
                    workTimeLimit: workTimeLimit,
                  }).map((gap, gapIndex) => (
                    <CalendarAddItemButton
                      item={gap}
                      workTimeLimit={workTimeLimit}
                      key={`calendar-add-item-${gapIndex}`}
                    />
                  ))}
                </div>
              ))}

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

export default WeekTab;
