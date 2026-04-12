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

function OrdersBlock({ prev, title, value }: Props) {
  const difference = value - prev;

  return (
    <Item className="flex h-full py-3">
      <ItemContent className="flex h-full flex-col items-start justify-center gap-1.5">
        <span className="text-muted-foreground font-semibold">{title}</span>
        <span className="**:text-xl">
          <AnimatedNumberChange value={value} Component={TypographySmall} startValue={0} />
        </span>
        <span
          className={cn(
            'align-super text-[10px]',
            difference > 0 ? 'text-blue-600' : 'text-red-600'
          )}
        >
          <AnimatedNumberChange
            value={difference}
            Component={TypographyExtraSmall}
            startValue={0}
          />{' '}
          new booking
        </span>
      </ItemContent>
    </Item>
  );
}

export default OrdersBlock;
