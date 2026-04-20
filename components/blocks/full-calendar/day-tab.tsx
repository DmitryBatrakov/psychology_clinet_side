import { Item, ItemContent, ItemHeader } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { format, isSameDay } from 'date-fns';
import { useContext, useMemo, useState } from 'react';
import CalendarItem from './calendar-item';
import { cn } from '@/lib/utils';
import { computeOverlapLayout, getGaps } from './halpers';
import CalendarAddItemButton from './calendar-add-item-button';
import { Schedule, ShownDateInterval } from '@/src/app/(specialist)/calendar/page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    }, [shownInterval, schedule]);

    const [selectedUid, setSelectedUid] = useState<string | null>(null);
    const selectedMeeting = daySchedule.find((m) => m.uid === selectedUid) ?? null;

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

                <div className="custom-scrollbar h-full overflow-y-scroll pt-1 pr-0.5 pb-3 pl-3 flex gap-5">
                    <section className="grid min-h-full grid-cols-[46px_1fr] grid-rows-1 w-full max-w-1/2">
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
                    <section className="w-full max-w-1/2 min-h-full px-4 py-2">
                        <Card className='min-h-full'>
                            {selectedMeeting ? (
                                <>
                                    <CardHeader className="gap-1 pb-3" style={{ borderBottom: `3px solid ${selectedMeeting.color}` }}>
                                        <CardTitle className="text-base">{selectedMeeting.name}</CardTitle>
                                        <p className="text-muted-foreground text-xs">
                                            {format(shownInterval, 'EEEE, MMMM d')}
                                            {' · '}
                                            {String(Math.floor(selectedMeeting.time[0])).padStart(2, '0')}:{selectedMeeting.time[0] % 1 !== 0 ? '30' : '00'}
                                            {' — '}
                                            {String(Math.floor(selectedMeeting.time[1])).padStart(2, '0')}:{selectedMeeting.time[1] % 1 !== 0 ? '30' : '00'}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4 pt-4">
                                        <div>
                                            <p className="text-muted-foreground mb-1 text-xs font-medium uppercase tracking-wide">Description</p>
                                            <p className="text-sm">{selectedMeeting.description}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1 text-xs font-medium uppercase tracking-wide">Meet link</p>
                                            <Button asChild variant="outline" size="sm" className="gap-2">
                                                <a href={selectedMeeting.meet_url} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                    Join meeting
                                                </a>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </>
                            ) : (
                                <CardContent className="flex h-full items-center justify-center">
                                    <p className="text-muted-foreground text-sm">Select a session to view details</p>
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
