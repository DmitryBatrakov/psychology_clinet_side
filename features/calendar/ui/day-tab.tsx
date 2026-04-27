import { ItemContent } from '@/components/ui/item';
import { getSessionColor } from '@/features/calendar/lib/sessionColors';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { format, isSameDay } from 'date-fns';
import { he } from 'date-fns/locale';
import { useContext, useMemo } from 'react';
import CalendarItem from './calendar-item';
import { cn } from '@/lib/utils';
import { computeOverlapLayout, getGaps } from '../lib/halpers';
import { toDateKey } from '@/lib/func/to-date-key/toDateKey';
import CalendarAddItemButton from './calendar-add-item-button';
import { Schedule, ShownDateInterval } from '@/src/app/(specialist)/calendar/page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Props {
    schedule: Schedule;
    workTimeLimit: { start: number; end: number };
}

function DayTab({ workTimeLimit, schedule }: Props) {
    const {
        getter: { shownInterval, selectedUid },
        setter: { setSelectedUid },
    } = useContext(ShownDateInterval);

    const rows = useMemo(() => workTimeLimit.end - workTimeLimit.start, [workTimeLimit]);

    const daySchedule = useMemo(() => {
        const dateKey = toDateKey(shownInterval);
        return schedule.filter((item) => item.date === dateKey);
    }, [shownInterval, schedule]);

    const selectedMeeting = daySchedule.find((m) => m.uid === selectedUid) ?? null;

    return (
        <TabsContent value="day" dir="rtl" className="flex h-full min-h-0">
            <ItemContent className="flex h-full flex-col gap-7">
                <section className="grid grid-cols-[46px_1fr] grid-rows-1 px-3 pt-3">
                    <div />
                    <button
                        className={cn(
                            'bg-accent flex h-8 w-full justify-center gap-1 rounded-t-lg p-2 *:w-full',
                            isSameDay(shownInterval, new Date()) && 'bg-blue-500 text-white hover:bg-blue-600'
                        )}
                    >
                        {format(shownInterval, 'EEEE', { locale: he })}
                    </button>
                </section>

                <div className="custom-scrollbar h-full overflow-y-scroll py-3 pr-0.5 pl-3 flex gap-5">
                    <section className="grid min-h-full grid-cols-[46px_1fr] grid-rows-1 w-full max-w-1/2" style={{ minHeight: `${rows * 84}px` }}>
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

                        <div className="relative grid h-full min-h-0 w-full">
                            <div className="relative z-10 size-full min-h-0 pb-3.5">
                                {(() => {
                                    const layout = computeOverlapLayout(daySchedule);
                                    return daySchedule.map((meeting, index) => (
                                        <CalendarItem
                                            key={`calendar-item-day-${index}`}
                                            workTimeLimit={workTimeLimit}
                                            meeting={meeting}
                                            columnIndex={layout[index].columnIndex}
                                            totalColumns={layout[index].totalColumns}
                                            isSelected={selectedUid === meeting.uid}
                                            onClick={() => setSelectedUid(meeting.uid === selectedUid ? null : meeting.uid)}
                                        />
                                    ));
                                })()}

                                {getGaps({
                                    meetings: daySchedule,
                                    workTimeLimit: workTimeLimit,
                                }).map((gap, gapIndex) => (
                                    <CalendarAddItemButton
                                        item={gap}
                                        workTimeLimit={workTimeLimit}
                                        date={shownInterval}
                                        key={`calendar-add-item-${gapIndex}`}
                                    />
                                ))}
                            </div>

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
                    <section className="w-full max-w-1/2 sticky top-0 self-start px-4 py-2">
                        <Card className="h-full overflow-y-auto">
                            {selectedMeeting ? (
                                <>
                                    <CardHeader className="gap-1 pb-3" style={{ borderBottom: `3px solid ${getSessionColor(selectedMeeting.type).accent}` }}>
                                        <CardTitle className="text-base">{selectedMeeting.name}</CardTitle>
                                        <p className="text-muted-foreground text-xs">
                                            {format(shownInterval, 'EEEE, MMMM d', { locale: he })}
                                            {' · '}
                                            {String(Math.floor(selectedMeeting.time[0])).padStart(2, '0')}:{selectedMeeting.time[0] % 1 !== 0 ? '30' : '00'}
                                            {' — '}
                                            {String(Math.floor(selectedMeeting.time[1])).padStart(2, '0')}:{selectedMeeting.time[1] % 1 !== 0 ? '30' : '00'}
                                        </p>
                                        {selectedMeeting.status === 'pending' && (
                                            <Badge variant="outline" className="border-red-400 text-red-600 bg-red-50 w-fit text-xs mt-1">
                                                ממתין לאישור
                                            </Badge>
                                        )}
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4 pt-4">
                                        <div>
                                            <p className="text-muted-foreground mb-1 text-xs font-medium uppercase tracking-wide">תיאור</p>
                                            <p className="text-sm">{selectedMeeting.description}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1 text-xs font-medium uppercase tracking-wide">קישור לפגישה</p>
                                            <Button asChild variant="outline" size="sm" className="gap-2">
                                                <a href={selectedMeeting.meet_url} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                    הצטרף לפגישה
                                                </a>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </>
                            ) : (
                                <CardContent className="flex h-full items-center justify-center min-h-50">
                                    <Badge className="text-foreground text-sm px-4 py-1 font-semibold">בחר פגישה לצפייה בפרטים</Badge>
                                </CardContent>
                            )}
                        </Card>
                    </section>
                </div>
            </ItemContent>
        </TabsContent>
    );
}

export default DayTab;
