'use client';
import { Schedule, ShownDateInterval } from '@/src/app/(specialist)/calendar/page';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ItemContent } from '@/components/ui/item';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useWidgetStorage } from '../widgets/widget-storage';

interface Props {
  schedule: Schedule;
}

function getCalendarDates(month: Date, weekStartsOn: 0 | 1 = 1) {
  return eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });
}

function MonthTab({ schedule }: Props) {
  const {
    getter: { shownInterval, currTab },
    setter: { setShownInterval, setCurrTab },
  } = useContext(ShownDateInterval);

  const monthDates = useMemo(() => getCalendarDates(shownInterval), [shownInterval]);
  const monthSchedule = useMemo(() => {
    const result: Record<string, typeof schedule> = {};
    monthDates.forEach((date) => {
      const dateKey = format(date, 'yyyy-MM-dd');
      result[dateKey] = schedule.filter((item) => item.date === dateKey);
    });
    return result;
  }, [monthDates]);

  // console.log(monthSchedule);

  const { isResizing } = useWidgetStorage();

  const calendar = useRef<HTMLDivElement>(null);

  return (
    <TabsContent value="month" className="flex h-full min-h-0">
      <ItemContent ref={calendar} className="flex h-full flex-col gap-0 p-2 pt-3">
        <Calendar
          mode="single"
          hideNavigation
          showOutsideDays
          month={shownInterval}
          className="h-full w-full p-0 **:aspect-auto"
          classNames={{
            month_caption: 'hidden',
            month_grid: 'h-full flex flex-col gap-2',
            weekdays: 'flex gap-1',
            month: 'flex  flex-col w-full gap-2',
            weeks: 'grid grid-rows-auto gap-1 h-full',
            week: 'flex w-full m-0 gap-1',
            table: 'h-full flex flex-wrap',
            day: 'flex w-full h-full  rounded-none justify-center items-center rounded-sm',
          }}
          components={{
            Weekday: (props) => {
              return (
                <th className="text-muted-foreground bg-accent flex w-full items-center justify-center rounded-sm py-1 text-center text-xs">
                  {props.children}
                </th>
              );
            },
            DayButton: (props) => {
              const BADGE_GAP = 4;
              const TOP_PADDING = 32;
              const BADGE_HEIGHT = 20;
              const { day, modifiers } = props;
              const ref = useRef<HTMLDivElement>(null);
              const [maxBadges, setMaxBadges] = useState(0);
              const dayTasks = monthSchedule[format(day.date, 'yyyy-MM-dd')] || [];
              const extraTasks = dayTasks.length - maxBadges;

              useLayoutEffect(() => {
                const innerHeight = Math.floor(ref.current?.getBoundingClientRect().height || 0);
                const maxCount = Math.floor(
                  (innerHeight - TOP_PADDING) / (BADGE_HEIGHT + BADGE_GAP)
                );
                maxBadges !== maxCount && setMaxBadges(maxCount);
              }, [ref.current, isResizing]);

              return (
                <Card
                  role="button"
                  ref={ref}
                  className={cn(
                    'group size-full cursor-pointer gap-0 overflow-hidden rounded-sm border-none p-0 shadow-[0_0_15px_0] shadow-black/5 transition-all hover:bg-gray-200',
                    format(day.date, 'dd') === format(new Date(), 'dd') &&
                    'bg-accent shadow-[inset_0_0_4px_0]',
                    modifiers.outside && 'opacity-50'
                  )}
                  onClick={() => {
                    setShownInterval(day.date);
                    setCurrTab('day');
                  }}
                >
                  <CardHeader className="justify-end px-2 pt-1 group-hover:underline">
                    {format(day.date, 'dd')}
                  </CardHeader>
                  <CardContent className="m-0 flex flex-col gap-1 p-0">
                    {dayTasks
                      .slice(0, extraTasks ? maxBadges - 1 : maxBadges)
                      .map((task, index) => (
                        <div key={index} className="flex items-center gap-1 px-2">
                          <div
                            className="line-clamp-1 rounded-full bg-blue-400 px-2 py-0.5 text-xs font-normal text-white"
                            style={{ background: task.color }}
                          >
                            <span>
                              {String(task.time[0]).replace('.5', '')}:
                              {task.time[0] % 1 !== 0 ? '30' : '00'}{' '}
                            </span>
                            <span className="font-semibold">{task.name}</span>
                          </div>
                        </div>
                      ))}
                    {extraTasks > 0 && (
                      <div className="flex items-center gap-1 px-2">
                        <div className="line-clamp-1 rounded-full bg-blue-400 px-2 py-0.5 text-xs font-normal text-white">
                          <span>+{extraTasks} more</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            },
          }}
        />
      </ItemContent>
    </TabsContent>
  );
}

export default MonthTab;
