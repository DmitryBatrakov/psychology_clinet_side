'use client';
import { Schedule, ShownDateInterval } from '@/src/app/(specialist)/calendar/page';
import { getSessionColor } from '@/features/calendar/lib/sessionColors';
import { getSessionStatus } from '@/features/calendar/lib/sessionStatus';
import { ItemContent } from '@/components/ui/item';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { Circle } from 'lucide-react';
import React, { useContext, useMemo } from 'react';
import { getWeekDates } from '../lib/halpers';
import { toDateKey } from '@/lib/func/to-date-key/toDateKey';

interface Props {
  schedule: Schedule;
  workTimeLimit: { start: number; end: number };
}

function ListTab({ schedule }: Props) {
  const {
    getter: { shownInterval },
    setter: { navigate },
  } = useContext(ShownDateInterval);

  const openDate = (date: Date) => navigate({ date, tab: 'day' });

  const listDates = useMemo(() => getWeekDates(shownInterval), [shownInterval]);
  const listSchedule = useMemo(() => {
    const result: Record<string, typeof schedule> = {};
    listDates.forEach((date) => {
      const dateKey = toDateKey(date);
      result[dateKey] = schedule.filter((item) => item.date === dateKey);
    });
    return result;
  }, [listDates]);

  return (
    <TabsContent value="list" dir="rtl" className="flex h-full min-h-0">
      <ItemContent
        className={cn(
          'flex h-full flex-col gap-0 p-3',
          '*:border-accent *:flex-1 *:rounded-lg *:border-[1.5px]'
        )}
      >
        <Table>
          <TableBody>
            {Object.entries(listSchedule).map(([day, list]) => {
              return (
                <React.Fragment key={`list-${day}`}>
                  <TableRow
                    hidden={!Boolean(list.length)}
                    className="bg-accent hover:bg-accent *:*:cursor-pointer *:*:underline-offset-1 *:*:hover:underline"
                  >
                    <TableCell className="font-normal">
                      <button onClick={() => openDate(new Date(day))}>{format(day, 'EEEE', { locale: he })}</button>
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      <button onClick={() => openDate(new Date(day))}>
                        {format(day, 'MMMM dd, yyyy', { locale: he })}
                      </button>
                    </TableCell>
                  </TableRow>

                  {list.map((meet) => {
                    const { isPending, isCompleted } = getSessionStatus(meet.status);
                    return (
                      <TableRow key={`meet-${meet.uid}`} className={`hover:bg-white ${isPending ? 'opacity-70' : ''} ${isCompleted ? 'opacity-50' : ''}`}>
                        <TableCell className={`w-36 text-xs ${isCompleted ? 'text-muted-foreground' : ''}`}>{`${String(meet.time[0]).replace('.5', '')}:${meet.time[0] % 1 !== 0 ? '30' : '00'} - ${String(meet.time[1]).replace('.5', '')}:${meet.time[1] % 1 !== 0 ? '30' : '00'}`}</TableCell>
                        <TableCell className="text-xs">
                          <div className="flex items-center gap-2">
                            <Circle size={10} fill={getSessionColor(meet.type).accent} stroke={getSessionColor(meet.type).accent} />
                            <span className={isCompleted ? 'text-muted-foreground' : ''}>{meet.name}</span>
                            {isPending && (
                              <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-300 rounded-full px-1.5 py-0.5 leading-tight">
                                ממתין לאישור
                              </span>
                            )}
                            {isCompleted && (
                              <span className="text-[10px] bg-gray-100 text-gray-500 border border-gray-200 rounded-full px-1.5 py-0.5 leading-tight">
                                הושלם
                              </span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </React.Fragment>
              );
            })}
            {Object.values(listSchedule).find((list) => Boolean(list.length)) === undefined && (
              <TableRow className="absolute top-0 flex size-full items-center justify-center">
                <TableCell className="">
                  <span className="text-sm">אין פגישות כרגע</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ItemContent>
    </TabsContent>
  );
}

export default ListTab;
