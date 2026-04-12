import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TrendingUpDown } from 'lucide-react';
import { AnimatedNumberChange } from '../../motion/animated-number-change';
import { TypographyExtraSmall } from '../../typography/typography-extra-small';
import { useWidgetPeriodStorage } from '../widget-storage';

const stats = new Map([
  [
    'month',
    [
      {
        name: 'PnL',
        value: 18.2,
        prev: 9.45,
        tip: 'Profit and Loss',
      },
      {
        name: 'CI',
        prev: 13,
        value: 8,
        tip: 'Cancellation Index',
      },
      {
        name: 'WI',
        prev: 17.25,
        value: 12.15,
        tip: 'Workload Index',
      },
    ],
  ],
  [
    'week',
    [
      {
        name: 'PnL',
        value: 10,
        prev: 8.3,
        tip: 'Profit and Loss',
      },
      {
        name: 'CI',
        value: 7.75,
        prev: 14,
        tip: 'Cancellation Index',
      },
      {
        name: 'WI',
        value: 10.05,
        prev: 5.25,
        tip: 'Workload Index',
      },
    ],
  ],
  [
    'day',
    [
      {
        name: 'PnL',
        value: 11,
        prev: 8.35,
        tip: 'Profit and Loss',
      },
      {
        name: 'CI',
        value: 9.75,
        prev: 14,
        tip: 'Cancellation Index',
      },
      {
        name: 'WI',
        value: 6.05,
        prev: 8.25,
        tip: 'Workload Index',
      },
    ],
  ],
]);

function IndexBody() {
  const { period, prevPeriod } = useWidgetPeriodStorage();

  return (
    <span className="flex items-center gap-4 text-xs">
      <TrendingUpDown size={14} />

      <div className="flex gap-6">
        {stats.get(period)?.map((stat) => {
          const difference = stat.value - stat.prev;
          const prev = prevPeriod
            ? stats.get(prevPeriod)?.find(({ name }) => name === stat.name)
            : null;

          return (
            <Tooltip key={stat.name}>
              <TooltipTrigger>
                <span className="font-semibold">{stat.name}: </span>
                <span>
                  <AnimatedNumberChange
                    postfix="%"
                    fixed={2}
                    value={stat.value}
                    Component={TypographyExtraSmall}
                    startValue={prev?.value || 0}
                  />
                </span>
                <span
                  className={cn(
                    'align-super text-[10px] opacity-50',
                    difference > 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  ({difference > 0 ? '↑ +' : '↓ '}
                  <AnimatedNumberChange
                    postfix="%"
                    fixed={2}
                    value={difference}
                    Component={TypographyExtraSmall}
                    startValue={prev ? prev.value - prev.prev : 0}
                  />
                  )
                </span>
              </TooltipTrigger>

              <TooltipContent>
                <p>{stat.tip}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </span>
  );
}

export default IndexBody;
