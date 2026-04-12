'use client';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Square } from 'lucide-react';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { AnimatedNumberChange } from '../../motion/animated-number-change';
import { TypographySmall } from '../../typography/typography-small';
import { Period, useWidgetPeriodStorage } from '../widget-storage';
import WorkloadTooltip from './workload-tooltip';

type WorkloadDataProps = Map<Period, PieDataProps[]>;
type PieDataProps = {
  name: 'leisure' | 'planned' | 'completed';
  value: number;
  color: string;
};

const workloadPieData: WorkloadDataProps = new Map([
  [
    'month',
    [
      {
        name: 'leisure',
        value: 10,
        color: '#a1a1a1',
      },

      {
        name: 'planned',
        value: 50,
        color: '#fc8a38',
      },
      {
        name: 'completed',
        value: 40,
        color: '#fa3434',
      },
    ],
  ],
  [
    'week',
    [
      {
        name: 'leisure',
        value: 20,
        color: '#a1a1a1',
      },

      {
        name: 'planned',
        value: 50,
        color: '#fc8a38',
      },
      {
        name: 'completed',
        value: 30,
        color: '#fa3434',
      },
    ],
  ],
  [
    'day',
    [
      {
        name: 'leisure',
        value: 60,
        color: '#a1a1a1',
      },

      {
        name: 'planned',
        value: 30,
        color: '#fc8a38',
      },
      {
        name: 'completed',
        value: 10,
        color: '#fa3434',
      },
    ],
  ],
]);

function WorkloadPieChart() {
  const { period, prevPeriod } = useWidgetPeriodStorage();

  return (
    <Tabs value={period} className="flex flex-1">
      {Array.from(workloadPieData).map(([tab, data], index) => (
        <TabsContent
          value={tab}
          key={`${tab}-${index}`}
          className="flex flex-1 flex-col gap-4 **:outline-none!"
        >
          <ResponsiveContainer className="flex flex-1" width="100%" height="100%">
            <PieChart className="border-border bg-muted rounded-lg border-[1.5px] border-dashed p-4">
              <WorkloadTooltip />
              <Pie
                data={data}
                dataKey="value"
                paddingAngle={5}
                startAngle={-10}
                innerRadius="80%"
                outerRadius="100%"
                isAnimationActive={false}
              >
                {data.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
                <AnimatedNumberChange
                  postfix="%"
                  position="center"
                  Component={Label}
                  className="**:font-space-grotesk -translate-y-1 text-2xl font-semibold"
                  fill="#000"
                  value={data.find((entry) => entry.name === 'completed')?.value || 0}
                  startValue={
                    prevPeriod
                      ? workloadPieData.get(prevPeriod)?.find((entry) => entry.name === 'completed')
                          ?.value || 0
                      : 0
                  }
                />
                <Label position={'center'} className="translate-y-4 text-xs">
                  Compleated
                </Label>
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="relative flex h-fit w-full flex-wrap gap-x-3 gap-y-2">
            {data.map((entry) => (
              <span
                key={`square-${entry.name}`}
                className="flex min-w-32 items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Square size={12} fill={entry.color} stroke={entry.color} />
                  <span className="text-muted-foreground text-xs capitalize">{entry.name}</span>
                </div>
                <AnimatedNumberChange
                  postfix="%"
                  value={entry.value}
                  Component={TypographySmall}
                  startValue={
                    prevPeriod
                      ? workloadPieData.get(prevPeriod)?.find(({ name }) => name === entry.name)
                          ?.value || 0
                      : 0
                  }
                />
              </span>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default WorkloadPieChart;
