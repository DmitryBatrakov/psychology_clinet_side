'use client';
import { AnimatedNumberChange } from '@/components/blocks/motion/animated-number-change';
import { TypographyExtraSmall } from '@/components/blocks/typography/typography-extra-small';
import { TypographySmall } from '@/components/blocks/typography/typography-small';
import { Item, ItemContent } from '@/components/ui/item';
import { cn } from '@/lib/utils';

interface Props {
  mode: 'pre-hour' | 'total';
  title: string;
  hours: {
    value: number;
    prev: number;
  };
  income: {
    value: number;
    prev: number;
  };
}

function IncomeBlock({ hours, title, income, mode }: Props) {
  const difference = income.value - income.prev;
  const differencePerHour = income.value / hours.value - income.prev / hours.prev;

  return (
    <Item className="flex h-full py-3">
      <ItemContent className="flex h-full flex-col items-start justify-center gap-1.5">
        <span className="text-muted-foreground font-semibold">{title}</span>
        <span
          className={cn(
            '**:text-xl',
            difference === 0 ? 'text-gray-600' : difference > 0 ? 'text-green-700' : 'text-red-600'
          )}
        >
          {mode === 'pre-hour' ? (
            <AnimatedNumberChange
              fixed={2}
              prefix="$"
              value={income.value / hours.value}
              startValue={income.prev / hours.prev}
              Component={TypographySmall}
              postfix="/h"
            />
          ) : (
            <AnimatedNumberChange
              prefix="$"
              value={income.value}
              startValue={income.prev}
              Component={TypographySmall}
            />
          )}
        </span>
        <span
          className={cn(
            'align-super text-[10px] opacity-50',
            difference === 0 ? 'text-gray-600' : difference > 0 ? 'text-green-700' : 'text-red-600'
          )}
        >
          {difference !== 0 && difference > 0 ? '↑ +' : '↓ '}
          <AnimatedNumberChange
            postfix="%"
            value={
              mode === 'pre-hour'
                ? (differencePerHour * 100) / (income.prev / hours.prev)
                : (difference * 100) / income.prev
            }
            Component={TypographyExtraSmall}
            startValue={0}
          />{' '}
          since last month
        </span>
      </ItemContent>
    </Item>
  );
}

export default IncomeBlock;
