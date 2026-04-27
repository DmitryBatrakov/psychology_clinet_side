import { Schedule, ShownDateInterval } from '@/src/app/(specialist)/calendar/page';
import CalendarItem from '@/features/calendar/ui/calendar-item';
import { Button } from '@/components/ui/button';
import { ItemContent } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format, isSameDay } from 'date-fns';
import { he } from 'date-fns/locale';
import { useContext, useMemo } from 'react';
import CalendarAddItemButton from './calendar-add-item-button';
import { computeOverlapLayout, getGaps, getWeekDates } from '../lib/halpers';
import { toDateKey } from '@/lib/func/to-date-key/toDateKey';

interface Props {
    schedule: Schedule;
    workTimeLimit: { start: number; end: number };
}

function WeekTab({ workTimeLimit, schedule }: Props) {
    const {
        getter: { shownInterval },
        setter: { navigate, setSelectedUid },
    } = useContext(ShownDateInterval);

    const rows = useMemo(() => workTimeLimit.end - workTimeLimit.start, [workTimeLimit]);

    const weekDates = useMemo(() => getWeekDates(shownInterval), [shownInterval]);
    const weekSchedule = useMemo(() => {
        const result: Record<string, typeof schedule> = {};
        weekDates.forEach((date) => {
            const dateKey = toDateKey(date);
            result[dateKey] = schedule.filter((item) => item.date === dateKey);
        });
        return result;
    }, [weekDates, schedule]);

    return (
        <TabsContent value="week" dir="rtl" className="flex h-full min-h-0">
            <ItemContent className="flex h-full flex-col gap-0">
                <section className="grid grid-cols-[36px_1fr] grid-rows-1 px-3 pt-3">
                    <div />
                    <div className="flex w-full gap-1 *:w-full">
                        {weekDates.map((day, index) => (
                            <Button
                            size={'sm'}
                            variant={'secondary'}
                            key={`week-day-${index}`}
                            onClick={() => navigate({ tab: 'day', date: day })}
                            className={cn(
                                'shrink cursor-pointer rounded-b-none border-b border-none border-gray-300 py-2 hover:brightness-95',
                                isSameDay(day, new Date()) && 'bg-blue-500 text-white hover:bg-blue-600'
                            )}
                            >
                                <span className="">{format(day, 'dd')}</span>
                                <span className="pt-0.5 text-xs font-light uppercase">{format(day, 'EEE', { locale: he })}</span>
                            </Button>
                        ))}
                    </div>
                </section>

                <div className="custom-scrollbar h-full overflow-y-scroll py-3 pr-0.5  pl-3">
                    <section className="grid min-h-full grid-cols-[46px_1fr] grid-rows-1 items-center justify-center" style={{ minHeight: `${rows * 84}px` }}>
                        <div className="relative pr-2 text-center" style={{ height: '100%' }}>
                            {Array.from({ length: rows + 1 }).map((_, index) => (
                                <div
                                    key={`time-slot-${index}`}
                                    className="absolute text-xs text-gray-500 -translate-y-1/2 -right-2 left-0"
                                    style={{ top: `${(index / rows) * 100}%` }}
                                >
                                    {index + workTimeLimit.start}:00
                                </div>
                            ))}
                        </div>

                        <div className="relative grid h-full w-full grid-cols-7 gap-1">
                            {Object.values(weekSchedule).map((meetings, index) => {
                                const layout = computeOverlapLayout(meetings);
                                return (
                                    <div
                                        key={`calendar-day-column-${index}`}
                                        className="relative z-10 h-full min-h-0"
                                    >
                                        {meetings.map((meeting, mIndex) => (
                                            <CalendarItem
                                                key={`calendar-item-week-${mIndex}`}
                                                workTimeLimit={workTimeLimit}
                                                meeting={meeting}
                                                columnIndex={layout[mIndex].columnIndex}
                                                totalColumns={layout[mIndex].totalColumns}
                                                onClick={() => {
                                                    setSelectedUid(meeting.uid);
                                                    navigate({ tab: 'day', date: weekDates[index] });
                                                }}
                                            />
                                        ))}
                                        {getGaps({
                                            meetings: meetings,
                                            workTimeLimit: workTimeLimit,
                                        }).map((gap, gapIndex) => (
                                            <CalendarAddItemButton
                                                item={gap}
                                                workTimeLimit={workTimeLimit}
                                                date={weekDates[index]}
                                                key={`calendar-add-item-${gapIndex}`}
                                            />
                                        ))}
                                    </div>
                                );
                            })}

                            <div className="absolute inset-0">
                                {Array.from({ length: rows * 2 + 1 }).map((_, index) => (
                                    <Separator
                                        key={`hour-separator-${index}`}
                                        className={cn('absolute w-full bg-accent h-0.5!', index % 2 !== 0 && 'h-px!')}
                                        style={{ top: `${(index / (rows * 2)) * 100}%` }}
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
