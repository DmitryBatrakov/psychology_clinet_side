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

function AverageProfitBlock({ prev, title, value }: Props) {
  const difference = value - prev;

  return (
    <Item className="flex h-full py-3">
      <ItemContent className="flex h-full flex-col items-start justify-center gap-1.5">
        <span className="text-muted-foreground font-semibold">{title}</span>
        <span className={cn('**:text-xl', difference > 0 ? 'text-green-700' : 'text-red-600')}>
          <AnimatedNumberChange
            prefix="$"
            value={value}
            startValue={prev}
            Component={TypographySmall}
            postfix="/order"
          />
        </span>
        <span
          className={cn(
            'align-super text-[10px] opacity-50',
            difference > 0 ? 'text-green-700' : 'text-red-600'
          )}
        >
          {difference > 0 ? '↑ +' : '↓ '}
          <AnimatedNumberChange
            postfix="%"
            value={(difference * 100) / prev}
            Component={TypographyExtraSmall}
            startValue={0}
          />{' '}
          since last month
        </span>
      </ItemContent>
    </Item>
  );
}

export default AverageProfitBlock;
