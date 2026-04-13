'use client';
import { xTickFormatterByMode } from '@/lib/func/chart-helpers/xTickFormatterByMode';
import { differenceInCalendarDays, getMonth, getYear } from 'date-fns';
import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { months } from '../../pickers/month-picker';
import { useWidgetDateStorageContext } from '../widget-storage';
import {
  getDayData,
  getMonthData,
  getPeriodData,
  getYearData,
  сalculateLoss,
} from './income-halpers';
import IncomeTooltip from './income-tooltip';

type BarTypeValue = 'year' | 'month' | 'week' | 'day';
type IncomeDataProps = { type: BarTypeValue; value: BarDataProps[] };
type BarDataProps = {
  x: string;
  expected: number;
  income: number;
};

function IncomeBody() {
  const [data, setData] = useState<IncomeDataProps>({
    type: 'month',
    value: getMonthData(getYear(new Date()), new Date().getMonth()),
  });

  const shownValue = сalculateLoss(data.value);
  const shownXAxios = xTickFormatterByMode(data.type);

  const { year, range, month, payload, setMonth, setYear, updateHistory } =
    useWidgetDateStorageContext();

  const upadetDate = (x: string) => {
    if (data.type === 'day') return;
    updateHistory({ key: 'day', payload: x });

    if (data.type === 'month' || data.type === 'week') {
      setData({
        type: 'day',
        value: getDayData(),
      });
    }

    setMonth(getMonth(x));
    setYear(getYear(x));
  };

  useEffect(() => {
    console.log('work', payload);
    if (payload) {
      setData({
        type: 'day',
        value: getDayData(),
      });
    } else if (range) {
      const length =
        range?.from && range.to ? Math.abs(differenceInCalendarDays(range.from, range.to)) + 1 : 1;

      setData({
        type: length > 7 ? 'month' : 'week',
        value: getPeriodData(length),
      });
    } else {
      const y = year ?? getYear(new Date());
      if (month === undefined || month < 0) {
        setData({ type: 'year', value: getYearData(y, 12) });
        return;
      }

      setData({
        type: 'month',
        value: getMonthData(y, month),
      });
    }
  }, [year, month, range, months, payload]);

  return (
    <ResponsiveContainer className="flex flex-1 **:outline-none!" width="100%" height="100%">
      <BarChart
        maxBarSize={64}
        data={shownValue}
        className="border-border bg-muted rounded-lg border-[1.5px] border-dashed pt-4"
      >
        <XAxis tickFormatter={shownXAxios} dataKey="x" />
        <YAxis width="auto" />
        <IncomeTooltip type={data.type} />
        <Bar
          stroke="0"
          stackId="a"
          background
          fill="#fa3434"
          dataKey="income"
          isAnimationActive={false}
          onClick={(event) => upadetDate(event.payload.x)}
          activeBar={{ fill: '#fc8a38aa', stroke: '#fc8a38', strokeWidth: 1.5 }}
        />
        <Bar
          stroke="0"
          stackId="a"
          background
          fill="#a1a1a1"
          dataKey="loss"
          isAnimationActive={false}
          onClick={(event) => upadetDate(event.payload.x)}
          activeBar={{ fill: '#fc8a3850', stroke: '#fc8a38', strokeWidth: 1.5 }}
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default IncomeBody;
