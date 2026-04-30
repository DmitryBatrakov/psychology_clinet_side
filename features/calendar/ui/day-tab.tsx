import { ItemContent } from '@/components/ui/item';
import { getSessionColor } from '@/features/calendar/lib/sessionColors';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { format, isSameDay } from 'date-fns';
import { he, is } from 'date-fns/locale';
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
import { formatDateTime } from '../../../lib/utils';
import { getSessionStatus } from '@/features/calendar/lib/sessionStatus';
import { SESSION_TYPE_LABELS } from '@/features/specialist/model/specialistLabels';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GENDER_LABELS } from '../../../lib/labels/genderLabels';
import { calculateAge } from '@/lib/func/calculate-age/calculateAge';

interface Props {
    schedule: Schedule;
    workTimeLimit: { start: number; end: number };
}

export default function DayTab({ workTimeLimit, schedule }: Props) {
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

    const { isPending, isCompleted, isCanceled } = getSessionStatus(selectedMeeting?.status);




    return (
        <TabsContent value="day" dir="rtl" className="flex h-full min-h-0">
            <ItemContent className="flex h-full min-h-0 flex-col gap-3">
                <section className="grid grid-cols-[36px_1fr] grid-rows-1  pt-3 items-center justify-center max-w-1/3">
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

                <div className="flex-1 min-h-0 flex gap-5 pr-0.5 pl-3">
                    <section className="custom-scrollbar h-full overflow-y-auto w-full max-w-1/3 py-3">
                        <div className="grid grid-cols-[46px_1fr] grid-rows-1" style={{ height: `${rows * 84}px` }}>
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
                        </div>
                    </section>
                    <section className="h-full w-full max-w-2/3 px-4">
                        <Card className=" overflow-y-auto gap-0">
                            {selectedMeeting ? (
                                <>
                                    <CardHeader className="gap-20 pb-3 flex justify-start items-center" style={{ borderBottom: `3px solid ${getSessionColor(selectedMeeting.type).accent}` }}>
                                        <CardTitle className="text-base flex flex-col items-center justify-start gap-5">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src={selectedMeeting.patient.photoUrl || undefined} />
                                                <AvatarFallback asChild><span className="text-xl bg-primary text-foreground">{selectedMeeting.patient.firstName.charAt(0)}{" "}{selectedMeeting.patient.lastName.charAt(0)}</span></AvatarFallback>
                                            </Avatar>
                                            <p className="text-lg font-semibold">{selectedMeeting.patient.firstName} {selectedMeeting.patient.lastName}</p>


                                        </CardTitle>
                                        <div className="flex flex-col gap-5">
                                            <p className="text-foreground text-sm font-semibold">
                                                {format(shownInterval, 'EEEE, MMMM d', { locale: he })}
                                                {' · '}
                                                {String(Math.floor(selectedMeeting.time[0])).padStart(2, '0')}:{selectedMeeting.time[0] % 1 !== 0 ? '30' : '00'}
                                                {' — '}
                                                {String(Math.floor(selectedMeeting.time[1])).padStart(2, '0')}:{selectedMeeting.time[1] % 1 !== 0 ? '30' : '00'}
                                            </p>
                                            <p className="text-sm text-muted-foreground">פגישה{' · '}{SESSION_TYPE_LABELS[selectedMeeting.type]}</p>
                                            <div className="flex items-center justify-start gap-3 text-sm text-muted-foreground">
                                                <p className="text-sm text-muted-foreground">{GENDER_LABELS[selectedMeeting.patient.gender]}{' · '}</p>
                                                <p>{calculateAge(selectedMeeting.patient.birthDate)}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    {isPending ? (
                                        <CardContent className="flex h-full items-center justify-center min-h-50">
                                            <Badge variant="outline" className="border-red-400 text-red-600 bg-red-50 w-fit text-sm px-4 py-2 font-semibold">
                                                פגישה זו ממתינה לאישור המטופל.
                                            </Badge>
                                        </CardContent>
                                    ) : (

                                        <CardContent className="flex flex-col gap-4 pt-4">
                                            <div>
                                                {selectedMeeting.notes ? (
                                                    <div className='flex flex-col gap-3 max-h-[50vh] overflow-y-auto'>
                                                        <p className="text-muted-foreground text-sm">הערות מהפגישות הקודמות:</p>
                                                        {selectedMeeting.notes.map((note, index) => (
                                                            <Card key={index}>
                                                                <CardHeader>
                                                                    <CardTitle>{formatDateTime(note.date)}</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                    <p>{note.note}</p>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                ) : null}
                                            </div>
                                            {isCompleted ? (
                                                <Badge variant="outline" className="border-emerald-400 text-emerald-600 bg-emerald-50 w-fit text-sm px-4 py-2 font-semibold">
                                                    פגישה זו הושלמה
                                                </Badge>
                                            ) : isCanceled ? (
                                                <Badge variant="outline" className="border-red-400 text-red-600 bg-red-50 w-fit text-sm px-4 py-2 font-semibold">
                                                    פגישה זו בוטלה
                                                </Badge>
                                            ) : (
                                                <div className=' w-full'>
                                                    <p className="text-muted-foreground mb-1 text-xs font-medium uppercase tracking-wide">קישור לפגישה</p>
                                                    <div className='w-full flex items-center justify-start gap-5'>
                                                        <Button asChild variant="outline" size="sm" className="gap-2">
                                                            <a href={selectedMeeting.meet_url} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="h-3.5 w-3.5" />
                                                                הצטרף לפגישה
                                                            </a>
                                                        </Button>
                                                        <Button variant='destructive' size='sm' className=''>
                                                            ביטול פגישה
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    )}
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

