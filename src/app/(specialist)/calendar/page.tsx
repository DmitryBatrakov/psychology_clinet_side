'use client';
import DayTab from '@/features/calendar/ui/day-tab';
import { getMiddleDate } from '@/features/calendar/lib/halpers';
import ListTab from '@/features/calendar/ui/list-tab';
import MonthTab from '@/features/calendar/ui/month-tab';
import WeekTab from '@/features/calendar/ui/week-tab';
import Widget from '@/components/blocks/widgets/widget';
import { Button } from '@/components/ui/button';
import { ItemHeader } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    getDaysInMonth,
    getTime,
    parse,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import { toDateKey } from '@/lib/func/to-date-key/toDateKey';
import { Schedule, VisitRecord } from '@/features/calendar/model/types';
export type { Schedule, VisitRecord } from '@/features/calendar/model/types';
import { mockSchedule } from '@/features/calendar/model/mockSchedule';
import { he } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, Dispatch, SetStateAction, Suspense, useCallback, useMemo, useState } from 'react';
import { NewSessionModal } from '@/features/calendar/ui/create-new-session-modal';
import { useWorkTimeLimit } from '@/features/calendar/hooks/useWorkTimeLimit';
import { authAtom } from '@/src/store/auth/authAtom';
import { useAtomValue } from 'jotai';
import { Spinner } from '@/components/ui/spinner';


type NewSession = { date: Date; startHour: number; endHour: number; name: string; x: number; y: number } | null;

type CalendarTab = ({} & string) | 'month' | 'week' | 'day' | 'list';

export const ShownDateInterval = createContext({
    getter: {
        currTab: 'month' as CalendarTab,
        shownInterval: new Date(),
        selectedUid: null as string | null,
        newSession: null as NewSession,
    },
    setter: {
        setShownInterval: function () { } as (date: Date) => void,
        setCurrTab: function () { } as (tab: CalendarTab) => void,
        navigate: function () { } as (updates: { date?: Date; tab?: CalendarTab }) => void,
        setSelectedUid: function () { } as Dispatch<SetStateAction<string | null>>,
        setNewSession: function () { } as Dispatch<SetStateAction<NewSession>>,
        addPendingSession: function () { } as (session: VisitRecord) => void,
    },
});

function CalendarContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const shownInterval = useMemo(() => {
        const dateParam = searchParams.get('date');
        if (dateParam) {
            const parsed = parse(dateParam, 'yyyy-MM-dd', new Date());
            return isNaN(parsed.getTime()) ? new Date() : parsed;
        }
        return new Date();
    }, [searchParams]);

    const currTab: CalendarTab = (searchParams.get('tab') as CalendarTab) || 'month';

    const [selectedUid, setSelectedUid] = useState<string | null>(null);
    const [newSession, setNewSession] = useState<NewSession>(null);
    const [schedule, setSchedule] = useState<Schedule>(mockSchedule);

    const { user, loading: authLoading } = useAtomValue(authAtom);
    const { data: workTimeLimitResponse, isLoading: workTimeLimitLoading } = useWorkTimeLimit(user?.uid ?? null, authLoading);
    const workTimeLimit = workTimeLimitResponse?.data;

    const addPendingSession = useCallback((session: VisitRecord) => {
        setSchedule(prev => [...prev, session]);
    }, []);

    const navigate = useCallback((updates: { date?: Date; tab?: CalendarTab }) => {
        const params = new URLSearchParams(searchParams.toString());
        if (updates.date) params.set('date', toDateKey(updates.date));
        if (updates.tab) params.set('tab', updates.tab);
        router.push(`?${params.toString()}`);
    }, [router, searchParams]);

    const setShownInterval = useCallback((date: Date) => {
        navigate({ date });
    }, [navigate]);

    const setCurrTab = useCallback((tab: CalendarTab) => {
        navigate({ tab });
    }, [navigate]);

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
                return `${format(date, 'MMM', { locale: he })} ${format(startOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')} — ${format(endOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')}, ${format(date, 'yyyy')}`;

            case 'month':
                return format(date, 'MMMM, yyyy', { locale: he });

            case 'day':
                return format(shownInterval, 'MMMM dd, yyyy', { locale: he });

            case 'list':
                return `${format(date, 'MMM', { locale: he })} ${format(startOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')} — ${format(endOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')}, ${format(date, 'yyyy')}`;
        }
    }, [shownInterval, currTab]);

    return (
        <ShownDateInterval.Provider
            value={{
                getter: { shownInterval, currTab, selectedUid, newSession },
                setter: { setShownInterval, setCurrTab, navigate, setSelectedUid, setNewSession, addPendingSession },
            }}
        >
            <Widget
                variant="default"
                dir="rtl"
                className="relative m-2 flex max-h-[calc(100%-16px)] min-h-0 flex-1 flex-col gap-0"
            >
                {newSession && (
                    <NewSessionModal />
                )}
                <Widget.Content className="max-h-full *:max-h-full">
                    <Tabs
                        value={currTab}
                        defaultValue="week"
                        onValueChange={setCurrTab}
                        className="flex h-full min-h-0 w-full flex-col gap-0"
                        dir='rtl'
                    >
                        <ItemHeader className="w-full basis-0 grid grid-cols-[1fr_auto_1fr] items-center justify-items gap-y-2 p-3">
                            <h1 className="truncate text-lg">{title}</h1>
                            <TabsList className="*:flex-1 *:cursor-pointer *:font-normal bg-primary/60 min-w-100">
                                <TabsTrigger value="month" >חודש</TabsTrigger>
                                <TabsTrigger value="week" >שבוע</TabsTrigger>
                                <TabsTrigger value="day" >יום</TabsTrigger>
                                <TabsTrigger value="list" >רשימה</TabsTrigger>
                            </TabsList>

                            <div className="flex justify-end gap-2 *:cursor-pointer *:shadow-sm">
                                <Button variant="ghost" className="mx-3 bg-white" size={'icon'}><Plus /></Button>
                                <Button onClick={() => intervalStep(-1)} variant="ghost" size={'icon'} className='bg-white'>
                                    <ChevronLeft className='rotate-180' />
                                </Button>
                                <Button onClick={() => setShownInterval(new Date())} variant="ghost" className='bg-white'>
                                    היום
                                </Button>
                                <Button onClick={() => intervalStep(1)} variant="ghost" size={'icon'} className='bg-white'>
                                    <ChevronRight className='rotate-180' />
                                </Button>
                            </div>
                        </ItemHeader>

                        <Separator />

                        <div className="relative flex-1 min-h-0">
                            <MonthTab schedule={schedule} />
                            {workTimeLimit && <>
                                <WeekTab schedule={schedule} workTimeLimit={workTimeLimit} />
                                <DayTab schedule={schedule} workTimeLimit={workTimeLimit} />
                                <ListTab schedule={schedule} workTimeLimit={workTimeLimit} />
                            </>}
                            {!workTimeLimit && (
                                <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
                                    <Spinner className="size-8 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                    </Tabs>
                </Widget.Content>
            </Widget>
        </ShownDateInterval.Provider>
    );
}

export default function Calendar() {
    return (
        <Suspense>
            <CalendarContent />
        </Suspense>
    );
}
