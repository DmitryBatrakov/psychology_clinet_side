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
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';

const workTimeLimit = { start: 6, end: 18 };

const data: Schedule = [
    { date: '2026-04-04', name: 'Bob Johnson', description: 'Planning session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-002', time: [9, 10], color: '#22c55e' },
    { date: '2026-04-05', name: 'Bob Johnson', description: 'Design review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-003', time: [11, 12], color: '#a855f7' },
    { date: '2026-04-06', name: 'Bob Johnson', description: 'Client call.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-004', time: [13, 14], color: '#f97316' },
    { date: '2026-04-07', name: 'Bob Johnson', description: 'Team sync.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-005', time: [15, 16], color: '#ef4444' },

    { date: '2026-04-09', name: 'Bob Johnson', description: 'Sprint review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-007', time: [10, 11], color: '#6366f1' },
    { date: '2026-04-10', name: 'Bob Johnson', description: 'Architecture discussion.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-008', time: [11, 12], color: '#84cc16' },
    { date: '2026-04-11', name: 'Bob Johnson', description: 'Code review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-009', time: [14, 15], color: '#ec4899' },
    { date: '2026-04-12', name: 'Bob Johnson', description: 'Retrospective.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-010', time: [16, 17], color: '#0ea5e9' },
    { date: '2026-04-13', name: 'Bob Johnson', description: 'Morning sync.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-011', time: [8, 9], color: '#f59e0b' },
    { date: '2026-04-15', name: 'Bob Johnson', description: 'Design sync.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-013', time: [10, 11], color: '#8b5cf6' },
    { date: '2026-04-16', name: 'Bob Johnson', description: 'Client presentation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-014', time: [13, 14], color: '#fb7185' },
    { date: '2026-04-17', name: 'Bob Johnson', description: 'Wrap-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-015', time: [15, 16], color: '#22d3ee' },
    { date: '2026-04-18', name: 'Bob Johnson', description: 'Team check-in.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-016', time: [9, 10], color: '#4ade80' },
    { date: '2026-04-19', name: 'Bob Johnson', description: 'Planning.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-017', time: [11, 12], color: '#c084fc' },
    { date: '2026-04-20', name: 'Bob Johnson', description: 'Design review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-018', time: [14, 15], color: '#f87171' },
    { date: '2026-04-21', name: 'Bob Johnson', description: 'Sprint demo.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-019', time: [10, 11], color: '#60a5fa' },
    { date: '2026-04-22', name: 'Bob Johnson', description: 'Retrospective.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-020', time: [12, 13], color: '#34d399' },
    { date: '2026-04-23', name: 'Bob Johnson', description: 'One-on-one.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-021', time: [8, 9], color: '#fbbf24' },
    { date: '2026-04-24', name: 'Bob Johnson', description: 'Architecture review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-022', time: [11, 12], color: '#818cf8' },
    { date: '2026-04-25', name: 'Bob Johnson', description: 'Code review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-023', time: [13, 14], color: '#fb923c' },
    { date: '2026-04-26', name: 'Bob Johnson', description: 'Team sync.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-024', time: [15, 16], color: '#2dd4bf' },
    { date: '2026-04-27', name: 'Bob Johnson', description: 'Planning.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-025', time: [16, 17], color: '#f472b6' },
    { date: '2026-04-01', name: 'Bob Johnson', description: 'Kickoff.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-026', time: [8, 9], color: '#38bdf8' },
    { date: '2026-04-02', name: 'Bob Johnson', description: 'Daily sync.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-027', time: [9, 10], color: '#4ade80' },
    { date: '2026-04-03', name: 'Bob Johnson', description: 'Design review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-028', time: [11, 12], color: '#a78bfa' },
    { date: '2026-04-04', name: 'Bob Johnson', description: 'Client call.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-029', time: [13, 14], color: '#fb7185' },
    { date: '2026-04-05', name: 'Bob Johnson', description: 'Wrap-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-030', time: [15, 16], color: '#22d3ee' },

    { date: '2026-04-17', name: 'Alice Petrova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-101', time: [6, 7], color: '#3b82f6' },
    { date: '2026-04-18', name: 'Alice Petrova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-101', time: [6, 7], color: '#3b82f6' },
    { date: '2026-04-14', name: 'Alice Petrova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-101', time: [6, 7], color: '#3b82f6' },
    { date: '2026-04-14', name: 'Ivan Sokolov', description: 'Anxiety session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-102', time: [7, 8], color: '#22c55e' },
    { date: '2026-04-14', name: 'Maria Volkova', description: 'Cognitive therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-103', time: [8, 9], color: '#a855f7' },
    { date: '2026-04-14', name: 'Dmitry Lebedev', description: 'Family counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-104', time: [9, 10], color: '#f97316' },
    { date: '2026-04-14', name: 'Olga Smirnova', description: 'Depression follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-105', time: [10, 11], color: '#ef4444' },
    { date: '2026-04-14', name: 'Pavel Morozov', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-106', time: [11, 12], color: '#14b8a6' },
    { date: '2026-04-14', name: 'Elena Kozlova', description: 'Trauma therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-107', time: [12, 13], color: '#6366f1' },
    { date: '2026-04-14', name: 'Sergey Novikov', description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-108', time: [13, 14], color: '#84cc16' },
    { date: '2026-04-14', name: 'Anna Fedorova', description: 'CBT session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-109', time: [14, 15], color: '#ec4899' },
    { date: '2026-04-14', name: 'Nikita Orlov', description: 'Closing consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-110', time: [15, 16], color: '#0ea5e9' },

    { date: '2026-04-08', name: 'Alice Petrova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-101', time: [6, 7], color: '#3b82f6' },
    { date: '2026-04-08', name: 'Ivan Sokolov', description: 'Anxiety session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-102', time: [7, 8], color: '#22c55e' },
    { date: '2026-04-08', name: 'Maria Volkova', description: 'Cognitive therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-103', time: [8, 9], color: '#a855f7' },
    { date: '2026-04-08', name: 'Olga Smirnova', description: 'Depression follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-105', time: [10, 11], color: '#ef4444' },
    { date: '2026-04-08', name: 'Pavel Morozov', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-106', time: [11, 12], color: '#14b8a6' },
    { date: '2026-04-08', name: 'Elena Kozlova', description: 'Trauma therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-107', time: [12, 13], color: '#6366f1' },
    { date: '2026-04-08', name: 'Sergey Novikov', description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-108', time: [13, 14], color: '#84cc16' },
    { date: '2026-04-08', name: 'Anna Fedorova', description: 'CBT session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-109', time: [14, 15], color: '#ec4899' },
    { date: '2026-04-08', name: 'Nikita Orlov', description: 'Closing consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-110', time: [15, 16], color: '#0ea5e9' },

    { date: '2026-04-15', name: 'Tatiana Belova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-111', time: [6, 7], color: '#f59e0b' },
    { date: '2026-04-15', name: 'Andrey Zaytsev', description: 'Phobia treatment.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-112', time: [7, 8], color: '#10b981' },
    { date: '2026-04-15', name: 'Yulia Stepanova', description: 'Cognitive therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-113', time: [8, 9], color: '#8b5cf6' },
    { date: '2026-04-15', name: 'Viktor Romanov', description: 'Grief counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-114', time: [9, 10], color: '#fb7185' },
    { date: '2026-04-15', name: 'Maxim Pavlov', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-116', time: [11, 12], color: '#4ade80' },
    { date: '2026-04-15', name: 'Natalia Volkov', description: 'Depression session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-117', time: [12, 13], color: '#c084fc' },
    { date: '2026-04-15', name: 'Roman Alekseev', description: 'Family therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-118', time: [13, 14], color: '#f87171' },
    { date: '2026-04-15', name: 'Svetlana Guseva', description: 'Trauma follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-119', time: [14, 15], color: '#60a5fa' },
    { date: '2026-04-15', name: 'Artem Sidorov', description: 'Closing consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-120', time: [15, 16], color: '#34d399' },

    { date: '2026-04-16', name: 'Ksenia Popova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-121', time: [6, 7], color: '#fbbf24' },
    { date: '2026-04-16', name: 'Mikhail Egorov', description: 'OCD therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-122', time: [7, 8], color: '#818cf8' },
    { date: '2026-04-16', name: 'Daria Tikhonova', description: 'Cognitive therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-123', time: [8, 9], color: '#fb923c' },
    { date: '2026-04-16', name: 'Alexey Baranov', description: 'Burnout counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-124', time: [9, 10], color: '#2dd4bf' },
    { date: '2026-04-16', name: 'Polina Voronova', description: 'Anxiety session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-125', time: [10, 11], color: '#f472b6' },
    { date: '2026-04-16', name: 'Denis Korolev', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-126', time: [11, 12], color: '#38bdf8' },
    { date: '2026-04-16', name: 'Veronika Moiseeva', description: 'Trauma therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-127', time: [12, 13], color: '#4ade80' },
    { date: '2026-04-16', name: 'Ludmila Fomina', description: 'CBT session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-129', time: [14, 15], color: '#fb7185' },
    { date: '2026-04-16', name: 'Grigory Nikitin', description: 'Closing consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-130', time: [15, 16], color: '#22d3ee' },
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
        selectedUid: null as string | null,
    },
    setter: {
        setShownInterval: function () { } as Dispatch<SetStateAction<Date>>,
        setCurrTab: function () { } as Dispatch<
            SetStateAction<({} & string) | 'month' | 'week' | 'day' | 'list'>
        >,
        setSelectedUid: function () { } as Dispatch<SetStateAction<string | null>>,
    },
});

export default function Calendar() {
    const [shownInterval, setShownInterval] = useState(new Date());
    const [currTab, setCurrTab] = useState<'month' | 'week' | 'day' | 'list' | ({} & string)>('month');
    const [selectedUid, setSelectedUid] = useState<string | null>(null);

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

    const title = useMemo(() => {
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
    }, [shownInterval, currTab]);

    return (
        <ShownDateInterval.Provider
            value={{
                getter: { shownInterval, currTab, selectedUid },
                setter: { setShownInterval, setCurrTab, setSelectedUid },
            }}
        >
            <Widget
                variant="default"
                className="relative m-2 flex max-h-[calc(100%-16px)] min-h-0 flex-1 flex-col gap-0"
            >
                <Widget.Content className="max-h-full *:max-h-full">
                    <Tabs
                        value={currTab}
                        defaultValue="week"
                        onValueChange={setCurrTab}
                        className="flex h-full min-h-0 w-full flex-col gap-0"
                    >
                        <ItemHeader className="w-full basis-0 grid grid-cols-[1fr_auto_1fr] items-center gap-y-2 p-3">
                            <h1 className="truncate text-lg">{title}</h1>
                            <TabsList className="*:flex-1 *:cursor-pointer *:font-normal bg-primary/60 min-w-100">
                                <TabsTrigger value="month" >Month</TabsTrigger>
                                <TabsTrigger value="week" >Week</TabsTrigger>
                                <TabsTrigger value="day" >Day</TabsTrigger>
                                <TabsTrigger value="list" >List</TabsTrigger>
                            </TabsList>

                            <div className="flex justify-end gap-2 *:cursor-pointer *:shadow-sm">
                                <Button variant="ghost" className="mx-3 bg-white" size={'icon'}><Plus /></Button>
                                <Button onClick={() => intervalStep(-1)} variant="ghost" size={'icon'} className='bg-white'>
                                    <ChevronLeft />
                                </Button>
                                <Button onClick={() => setShownInterval(new Date())} variant="ghost" className='bg-white'>
                                    Today
                                </Button>
                                <Button onClick={() => intervalStep(1)} variant="ghost" size={'icon'} className='bg-white'>
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
