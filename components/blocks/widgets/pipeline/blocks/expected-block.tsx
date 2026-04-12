'use client';
import { AnimatedNumberChange } from '@/components/blocks/motion/animated-number-change';
import { TypographyExtraSmall } from '@/components/blocks/typography/typography-extra-small';
import { TypographySmall } from '@/components/blocks/typography/typography-small';
import { Item, ItemContent } from '@/components/ui/item';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  value: number;
  prev: number;
}

function ExpectedBlock({ prev, title, value }: Props) {
  const difference = value - prev;

  return (
    <Item className="flex h-full py-3">
      <ItemContent className="flex h-full flex-col items-start justify-center gap-1.5">
        <span className="text-muted-foreground font-semibold">{title}</span>
        <span
          className={cn(
            '**:text-xl',
            difference === 0 ? 'text-gray-600' : difference > 0 ? 'text-amber-500' : 'text-red-600'
          )}
        >
          <AnimatedNumberChange
            prefix="$"
            value={value}
            startValue={prev}
            Component={TypographySmall}
          />
        </span>
        <span
          className={cn(
            'align-super text-[10px] opacity-50',
            difference === 0 ? 'text-gray-600' : difference > 0 ? 'text-amber-500' : 'text-red-600'
          )}
        >
          {difference !== 0 && difference > 0 ? '↑ +' : '↓ '}
          <AnimatedNumberChange
            postfix="%"
            startValue={0}
            value={(difference * 100) / prev}
            Component={TypographyExtraSmall}
          />{' '}
          vs last week
        </span>
      </ItemContent>
    </Item>
  );
}

export default ExpectedBlock;
