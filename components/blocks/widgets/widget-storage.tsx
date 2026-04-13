import { getTime } from 'date-fns';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { hasMarker } from './widget-helpers';
import { useIsResizing } from '@/lib/hooks/use-is-resizing';

export const periods = ['year', 'month', 'week', 'day', 'all-time'] as const;
export type Period = (typeof periods)[number];

interface WidgetStorageContext {
  isResizing: boolean;
  size: { width: number; height: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const WidgetStoregeContext = createContext({} as WidgetStorageContext);

export function useWidgetStorage() {
  const context = React.useContext(WidgetStoregeContext);
  if (!context) {
    throw new Error('useWidgetStorage must be used within a WidgetStorage');
  }
  return context;
}

interface PeriodStorageContext {
  period: Period;
  setPeriod: React.Dispatch<React.SetStateAction<Period>>;
  prevPeriod: Period | null;
  setPrevPeriod: React.Dispatch<React.SetStateAction<Period | null>>;
}
export const PeriodStorageContext = createContext({} as PeriodStorageContext);

export function useWidgetPeriodStorage() {
  const context = React.useContext(PeriodStorageContext);
  if (!context) {
    throw new Error('useWidgetStorage must be used within a WidgetStorage');
  }
  return context;
}

function PeriodStorage({ children }: { children: React.ReactNode }) {
  const [period, setPeriod] = useState<Period>('week');
  const [prevPeriod, setPrevPeriod] = useState<Period | null>(null);

  const value = useMemo(
    () => ({ period, setPeriod, prevPeriod, setPrevPeriod }),
    [period, prevPeriod, setPeriod, setPrevPeriod]
  );

  return <PeriodStorageContext.Provider value={value}>{children}</PeriodStorageContext.Provider>;
}

type History = {
  key: string;
  year: number;
  payload: unknown;
  month: number | undefined;
  range: DateRange | undefined;
};

interface DateStorageContext {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  month: number | undefined;
  setMonth: React.Dispatch<React.SetStateAction<number | undefined>>;
  history: Array<History>;
  setHistory: React.Dispatch<React.SetStateAction<Array<History>>>;
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  payload: unknown;
  setPayload: React.Dispatch<React.SetStateAction<unknown>>;

  updateHistory: (args?: { key?: string; payload?: unknown }) => void;
  prevHistory: () => void;
}

export const DateStorageContext = createContext({} as DateStorageContext);

export function useWidgetDateStorageContext() {
  const context = React.useContext(DateStorageContext);
  if (!context) {
    throw new Error('useWidgetStorage must be used within a WidgetStorage');
  }
  return context;
}

function DateStorage({ children }: { children: React.ReactNode }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<number | undefined>(new Date().getMonth());
  const [history, setHistory] = useState<History[]>([]);
  const [payload, setPayload] = useState<unknown>();

  const updateHistory = ({ key, payload }: { key?: string; payload?: unknown } = {}) => {
    const history_key = `${getTime(year ?? 0)}-${getTime(month ?? 0)}-${getTime(range?.from ?? 0)}-${getTime(range?.to ?? 0)}-${key ?? '×'}`;
    if (history.at(-1)?.key !== history_key)
      setHistory([...history, { key: history_key, year, month, range, payload }]);
  };

  const prevHistory = () => {
    const lastHistory = history.at(-1);
    if (lastHistory) {
      setYear(lastHistory.year);
      setPayload(lastHistory?.payload);
      lastHistory?.range && setRange(lastHistory.range);
      lastHistory?.month && setMonth(lastHistory?.month);
    }
    setHistory((history) => history.slice(0, history.length - 1));
  };

  const value = useMemo(
    () => ({
      year,
      month,
      range,
      payload,
      history,
      setYear,
      setMonth,
      setRange,
      setPayload,
      setHistory,
      prevHistory,
      updateHistory,
    }),
    [
      year,
      month,
      range,
      payload,
      history,
      setYear,
      setMonth,
      setRange,
      setPayload,
      setHistory,
      prevHistory,
      updateHistory,
    ]
  );

  return <DateStorageContext.Provider value={value}>{children}</DateStorageContext.Provider>;
}

export function WidgetStorage({ children }: { children: React.ReactNode }) {
  const { ref, isResizing, size } = useIsResizing({ delay: 50 });
  const hasPeriodSelect = useMemo(() => hasMarker(children, 'PeriodSelect'), [children]);
  const hasDateSelect = useMemo(() => hasMarker(children, 'DateSelect'), [children]);

  if (hasDateSelect && hasPeriodSelect) {
    throw new Error('Widget не может содержать одновременно DateSelect и PeriodSelect');
  }

  const value = useMemo(
    () => ({ isResizing, containerRef: ref, size: size ?? { width: 0, height: 0 } }),
    [isResizing, ref, size]
  );

  useEffect(() => {
    if (ref.current && size) {
      ref.current.style.setProperty('--widget-content-height', `${size.height}px`);
      ref.current.style.setProperty('--widget-content-width', `${size.width}px`);
    }
  }, [size, isResizing]);

  return (
    <WidgetStoregeContext.Provider value={value}>
      {hasPeriodSelect && <PeriodStorage>{children}</PeriodStorage>}
      {hasDateSelect && <DateStorage>{children}</DateStorage>}
      {!hasPeriodSelect && !hasDateSelect && children}
    </WidgetStoregeContext.Provider>
  );
}
