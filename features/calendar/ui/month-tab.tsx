'use client';
import { Schedule, ShownDateInterval } from '@/src/app/(specialist)/calendar/page';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ItemContent } from '@/components/ui/item';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import { toDateKey } from '@/lib/func/to-date-key/toDateKey';
import { he } from 'date-fns/locale';
import { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';

interface Props {
    schedule: Schedule;
}

function getCalendarDates(month: Date) {
    return eachDayOfInterval({
        start: startOfMonth(month),
        end: endOfMonth(month),
    });
}

function MonthTab({ schedule }: Props) {
    const {
        getter: { shownInterval },
        setter: { navigate },
    } = useContext(ShownDateInterval);

    const monthDates = useMemo(() => getCalendarDates(shownInterval), [shownInterval]);
    const monthSchedule = useMemo(() => {
        const result: Record<string, typeof schedule> = {};
        monthDates.forEach((date) => {
            const dateKey = toDateKey(date);
            result[dateKey] = schedule.filter((item) => item.date === dateKey);
        });
        return result;
    }, [monthDates, schedule]);

    const calendar = useRef<HTMLDivElement>(null);

    return (
        <TabsContent value="month" className="flex h-full min-h-0">
            <ItemContent ref={calendar} className="flex h-full flex-col gap-0 p-2 pt-3">
                <Calendar
                    mode="single"
                    hideNavigation
                    showOutsideDays
                    locale={he}
                    month={shownInterval}
                    className="h-full w-full p-0 **:aspect-auto"
                    classNames={{
                        month_caption: 'hidden',
                        root: 'w-full h-full',
                        months: 'flex flex-col h-full',
                        month: 'flex flex-col w-full h-full',
                        month_grid: 'flex flex-col h-full flex-1 gap-2',
                        weekdays: 'flex gap-1',
                        weeks: 'flex flex-col flex-1 gap-1 min-h-0',
                        week: 'flex w-full m-0 gap-1 flex-1 min-h-0',
                        day: 'flex w-full h-full min-h-0 rounded-none justify-center items-center rounded-sm aspect-auto',
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
                            const TOP_PADDING = 32 + 8; 
                            const BOTTOM_PADDING = 8;
                            const BADGE_HEIGHT = 20;
                            const { day, modifiers } = props;
                            const ref = useRef<HTMLDivElement>(null);
                            const [maxBadges, setMaxBadges] = useState(0);
                            const dayTasks = monthSchedule[toDateKey(day.date)] || [];
                            const extraTasks = dayTasks.length - maxBadges;

                            useLayoutEffect(() => {
                                const el = ref.current;
                                if (!el) return;

                                const update = () => {
                                    const innerHeight = Math.floor(el.getBoundingClientRect().height);
                                    const maxCount = Math.floor(
                                        (innerHeight - TOP_PADDING - BOTTOM_PADDING) / (BADGE_HEIGHT + BADGE_GAP)
                                    );
                                    setMaxBadges((prev) => (prev !== maxCount ? maxCount : prev));
                                };

                                update();
                                const ro = new ResizeObserver(update);
                                ro.observe(el);
                                return () => ro.disconnect();
                            }, []);

                            return (
                                <Card
                                    role="button"
                                    ref={ref}
                                    className={cn(
                                        'group size-full cursor-pointer gap-0 overflow-hidden rounded-sm border-none p-0 shadow-[0_0_15px_0] shadow-black/5 transition-all hover:bg-gray-200',
                                        toDateKey(day.date) === toDateKey(new Date()) &&
                                        'bg-accent shadow-[inset_0_0_4px_0]',
                                        modifiers.outside && 'opacity-30'
                                    )}
                                    onClick={() => {
                                        navigate({
                                            date: day.date,
                                            ...(modifiers.outside ? {} : { tab: 'day' }),
                                        });
                                    }}
                                >
                                    <CardHeader className="justify-end px-2 pt-1 group-hover:underline">
                                        {format(day.date, 'dd')}
                                    </CardHeader>
                                    <CardContent className="m-0 flex flex-col gap-1 overflow-hidden px-1 py-2">
                                        {dayTasks
                                            .slice(0, extraTasks ? maxBadges - 1 : maxBadges)
                                            .map((task, index) => (
                                                <div key={index} className="flex items-center gap-1 px-2 justify-center xl:justify-start">
                                                    <div
                                                        className={`line-clamp-1 rounded-full px-2 py-0.5 text-xs font-normal text-white w-full text-center xl:text-start xl:w-auto ${task.status === 'pending' ? 'border border-dashed opacity-70' : ''}`}
                                                        style={{
                                                            background: task.color,
                                                            borderColor: task.status === 'pending' ? task.color : undefined,
                                                        }}
                                                    >
                                                        <span>
                                                            {String(task.time[0]).replace('.5', '')}:
                                                            {task.time[0] % 1 !== 0 ? '30' : '00'}{' '}
                                                        </span>
                                                        <span className="font-semibold hidden xl:inline text-white">{task.name}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        {extraTasks > 0 && (
                                            <div className="flex items-center gap-1 px-2">
                                                <div className="line-clamp-1 rounded-full bg-blue-400 px-2 py-0.5 text-xs font-normal text-white">
                                                    <span>עוד +{extraTasks}</span>
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
