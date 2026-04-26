'use client';
import { Schedule, ShownDateInterval } from '@/src/app/(specialist)/calendar/page';
import { ItemContent } from '@/components/ui/item';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { Circle } from 'lucide-react';
import React, { useContext, useMemo } from 'react';
import { getWeekDates } from '../lib/halpers';

interface Props {
  schedule: Schedule;
  workTimeLimit: { start: number; end: number };
}

function ListTab({ schedule }: Props) {
  const {
    getter: { shownInterval },
    setter: { setShownInterval, setCurrTab },
  } = useContext(ShownDateInterval);

  const openDate = (date: Date) => {
    (setShownInterval(date), setCurrTab('day'));
  };

  const listDates = useMemo(() => getWeekDates(shownInterval), [shownInterval]);
  const listSchedule = useMemo(() => {
    const result: Record<string, typeof schedule> = {};
    listDates.forEach((date) => {
      const dateKey = format(date, 'yyyy-MM-dd');
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

                  {list.map((meet) => (
                    <TableRow key={`meet-${meet.uid}`} className="hover:bg-white">
                      <TableCell className="w-36 text-xs">{`${String(meet.time[0]).replace('.5', '')}:${meet.time[0] % 1 !== 0 ? '30' : '00'} - ${String(meet.time[1]).replace('.5', '')}:${meet.time[1] % 1 !== 0 ? '30' : '00'}`}</TableCell>
                      <TableCell className="text-xs">
                        <div className="flex items-center gap-2">
                          <Circle size={10} fill={meet.color} stroke={meet.color} />
                          <span>{meet.name}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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
