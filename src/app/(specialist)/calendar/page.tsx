'use client';
import DayTab from '@/components/blocks/full-calendar/day-tab';
import { getMiddleDate } from '@/components/blocks/full-calendar/halpers';
import ListTab from '@/components/blocks/full-calendar/list-tab';
import MonthTab from '@/components/blocks/full-calendar/month-tab';
import WeekTab from '@/components/blocks/full-calendar/week-tab';
import Widget from '@/components/blocks/widgets/widget';
import { Button } from '@/components/ui/button';
import { Item, ItemHeader } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  getDaysInMonth,
  getTime,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';

const workTimeLimit = { start: 8, end: 18 };

const data: Schedule = [
  {
    date: '2026-01-03',
    name: 'Bob Johnson',
    description: 'Morning sync.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-001',
    time: [8, 9],
    color: '#3b82f6',
  },
  {
    date: '2026-01-04',
    name: 'Bob Johnson',
    description: 'Planning session.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-002',
    time: [9.5, 10.5],
    color: '#22c55e',
  },
  {
    date: '2026-01-05',
    name: 'Bob Johnson',
    description: 'Design review.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-003',
    time: [11, 12],
    color: '#a855f7',
  },
  {
    date: '2026-01-06',
    name: 'Bob Johnson',
    description: 'Client call.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-004',
    time: [13, 14],
    color: '#f97316',
  },
  {
    date: '2026-01-07',
    name: 'Bob Johnson',
    description: 'Team sync.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-005',
    time: [15, 16],
    color: '#ef4444',
  },

  {
    date: '2026-01-08',
    name: 'Bob Johnson',
    description: 'Daily standup.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-006',
    time: [8.5, 9.5],
    color: '#14b8a6',
  },
  {
    date: '2026-01-09',
    name: 'Bob Johnson',
    description: 'Sprint review.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-007',
    time: [10, 11],
    color: '#6366f1',
  },
  {
    date: '2026-01-10',
    name: 'Bob Johnson',
    description: 'Architecture discussion.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-008',
    time: [11.5, 12.5],
    color: '#84cc16',
  },
  {
    date: '2026-01-11',
    name: 'Bob Johnson',
    description: 'Code review.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-009',
    time: [14, 15],
    color: '#ec4899',
  },
  {
    date: '2026-01-12',
    name: 'Bob Johnson',
    description: 'Retrospective.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-010',
    time: [16, 17],
    color: '#0ea5e9',
  },

  {
    date: '2026-01-13',
    name: 'Bob Johnson',
    description: 'Morning sync.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-011',
    time: [8, 8.5],
    color: '#f59e0b',
  },
  {
    date: '2026-01-14',
    name: 'Bob Johnson',
    description: 'Planning meeting.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-012',
    time: [9, 10],
    color: '#10b981',
  },
  {
    date: '2026-01-15',
    name: 'Bob Johnson',
    description: 'Design sync.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-013',
    time: [10.5, 11.5],
    color: '#8b5cf6',
  },
  {
    date: '2026-01-16',
    name: 'Bob Johnson',
    description: 'Client presentation.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-014',
    time: [13.5, 14.5],
    color: '#fb7185',
  },
  {
    date: '2026-01-17',
    name: 'Bob Johnson',
    description: 'Wrap-up.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-015',
    time: [15.5, 16.5],
    color: '#22d3ee',
  },

  {
    date: '2026-01-18',
    name: 'Bob Johnson',
    description: 'Team check-in.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-016',
    time: [9, 10],
    color: '#4ade80',
  },
  {
    date: '2026-01-19',
    name: 'Bob Johnson',
    description: 'Planning.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-017',
    time: [11, 12],
    color: '#c084fc',
  },
  {
    date: '2026-01-20',
    name: 'Bob Johnson',
    description: 'Design review.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-018',
    time: [14, 15],
    color: '#f87171',
  },
  {
    date: '2026-01-21',
    name: 'Bob Johnson',
    description: 'Sprint demo.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-019',
    time: [10, 11],
    color: '#60a5fa',
  },
  {
    date: '2026-01-22',
    name: 'Bob Johnson',
    description: 'Retrospective.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-020',
    time: [12.5, 13.5],
    color: '#34d399',
  },

  {
    date: '2026-01-23',
    name: 'Bob Johnson',
    description: 'One-on-one.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-021',
    time: [8.5, 9.5],
    color: '#fbbf24',
  },
  {
    date: '2026-01-24',
    name: 'Bob Johnson',
    description: 'Architecture review.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-022',
    time: [11, 12],
    color: '#818cf8',
  },
  {
    date: '2026-01-25',
    name: 'Bob Johnson',
    description: 'Code review.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-023',
    time: [13, 14.5],
    color: '#fb923c',
  },
  {
    date: '2026-01-26',
    name: 'Bob Johnson',
    description: 'Team sync.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-024',
    time: [15, 16],
    color: '#2dd4bf',
  },
  {
    date: '2026-01-27',
    name: 'Bob Johnson',
    description: 'Planning.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-025',
    time: [16, 17],
    color: '#f472b6',
  },

  {
    date: '2026-02-01',
    name: 'Bob Johnson',
    description: 'Kickoff.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-026',
    time: [8, 9],
    color: '#38bdf8',
  },
  {
    date: '2026-02-02',
    name: 'Bob Johnson',
    description: 'Daily sync.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-027',
    time: [9.5, 10.5],
    color: '#4ade80',
  },
  {
    date: '2026-02-03',
    name: 'Bob Johnson',
    description: 'Design review.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-028',
    time: [11, 12],
    color: '#a78bfa',
  },
  {
    date: '2026-02-04',
    name: 'Bob Johnson',
    description: 'Client call.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-029',
    time: [13, 14],
    color: '#fb7185',
  },
  {
    date: '2026-02-05',
    name: 'Bob Johnson',
    description: 'Wrap-up.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-030',
    time: [15.5, 16.5],
    color: '#22d3ee',
  },

  // ещё 20 элементов по такому же принципу при необходимости
];

export type Schedule = visitRecord[];
type visitRecord = {
  color: string;
  date: string;
  name: string;
  description: string;
  meet_url: string;
  uid: string;
  time: [number, number];
};

export const ShownDateInterval = createContext({
  getter: {
    currTab: 'week' as ({} & string) | 'month' | 'week' | 'day' | 'list',
    shownInterval: new Date(),
  },
  setter: {
    setShownInterval: function () {} as Dispatch<SetStateAction<Date>>,
    setCurrTab: function () {} as Dispatch<
      SetStateAction<({} & string) | 'month' | 'week' | 'day' | 'list'>
    >,
  },
});

export default function Calendar() {
  const [shownInterval, setShownInterval] = useState(new Date());
  const [currTab, setCurrTab] = useState<'month' | 'week' | 'day' | 'list' | ({} & string)>('week');

  const intervalStep = (dir: -1 | 1) => {
    let end, start;
    switch (currTab) {
      case 'week':
        end = endOfWeek(shownInterval, { weekStartsOn: 0 });
        start = startOfWeek(shownInterval, { weekStartsOn: 0 });

        setShownInterval(getMiddleDate(addDays(end, 7 * dir), addDays(start, 7 * dir)));
        break;

      case 'list':
        end = endOfWeek(shownInterval, { weekStartsOn: 0 });
        start = startOfWeek(shownInterval, { weekStartsOn: 0 });

        setShownInterval(getMiddleDate(addDays(end, 7 * dir), addDays(start, 7 * dir)));
        break;

      case 'month':
        const days = getDaysInMonth(shownInterval);

        end = endOfMonth(shownInterval);
        start = startOfMonth(shownInterval);

        setShownInterval(getMiddleDate(addDays(end, days * dir), addDays(start, days * dir)));
        break;

      case 'day':
        setShownInterval(addDays(shownInterval, 1 * dir));
        break;
    }
  };

  const getDateTitle = () => {
    const date = getTime(shownInterval);
    switch (currTab) {
      case 'week':
        return `${format(date, 'MMM')} ${format(startOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')} — ${format(endOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')}, ${format(date, 'yyyy')}`;

      case 'month':
        return format(date, 'MMMM, yyyy');

      case 'day':
        return format(shownInterval, 'MMMM dd, yyyy');

      case 'list':
        return `${format(date, 'MMM')} ${format(startOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')} — ${format(endOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')}, ${format(date, 'yyyy')}`;
    }
  };

  const title = useMemo(() => getDateTitle(), [shownInterval, currTab]);

  return (
    <ShownDateInterval.Provider
      value={{
        getter: { shownInterval: shownInterval, currTab: currTab },
        setter: { setShownInterval: setShownInterval, setCurrTab: setCurrTab },
      }}
    >
      <Widget
        variant="default"
        className="relative m-2 flex max-h-[calc(100%-16px)] min-h-0 min-w-220 flex-1 flex-col gap-0 overflow-hidden p-0"
      >
        <Widget.Content className="max-h-full *:max-h-full">
          <Tabs
            value={currTab}
            defaultValue="week"
            onValueChange={setCurrTab}
            className="flex h-full min-h-0 w-full flex-col gap-0"
          >
            <ItemHeader className="w-full basis-0 justify-between p-3 *:w-full">
              <h1 className="text-lg">{title}</h1>
              <TabsList className="*:w-26 *:cursor-pointer *:font-normal">
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>

              <div className="flex justify-end gap-2 *:cursor-pointer *:shadow-sm">
                <Button onClick={() => intervalStep(-1)} variant="ghost" size={'icon'}>
                  <ChevronLeft />
                </Button>
                <Button onClick={() => setShownInterval(new Date())} variant="ghost">
                  Today
                </Button>
                <Button onClick={() => intervalStep(1)} variant="ghost" size={'icon'}>
                  <ChevronRight />
                </Button>
              </div>
            </ItemHeader>
            <Separator />

            <MonthTab schedule={data} />
            <WeekTab schedule={data} workTimeLimit={workTimeLimit} />
            <DayTab schedule={data} workTimeLimit={workTimeLimit} />
            <ListTab schedule={data} workTimeLimit={workTimeLimit} />
          </Tabs>
        </Widget.Content>
      </Widget>
    </ShownDateInterval.Provider>
  );
}
