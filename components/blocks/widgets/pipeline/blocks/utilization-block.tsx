'use client';
import { AnimatedNumberChange } from '@/components/blocks/motion/animated-number-change';
import { TypographyExtraSmall } from '@/components/blocks/typography/typography-extra-small';
import { TypographySmall } from '@/components/blocks/typography/typography-small';
import { Item, ItemContent } from '@/components/ui/item';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  prev: { hours: number; total_hours: number };
  value: { hours: number; total_hours: number };
}

function UtilizationBlock({ prev, title, value }: Props) {
  const difference = value.hours / value.total_hours - prev.hours / prev.total_hours;

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
          <AnimatedNumberChange
            postfix="%"
            startValue={0}
            Component={TypographySmall}
            value={(value.hours / value.total_hours) * 100}
          />
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
            value={difference * 100}
            Component={TypographyExtraSmall}
            startValue={0}
          />{' '}
          since last month
        </span>
      </ItemContent>
    </Item>
  );
}

export default UtilizationBlock;
