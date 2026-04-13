'use client';
import { AnimatedNumberChange } from '@/components/blocks/motion/animated-number-change';
import { TypographyExtraSmall } from '@/components/blocks/typography/typography-extra-small';
import { TypographySmall } from '@/components/blocks/typography/typography-small';
import { Item, ItemContent } from '@/components/ui/item';
import { cn } from '@/lib/utils';
interface Props {
  title: string;
  bookings: number;
  leads: number;
}

function ConversionBlock({ bookings, title, leads }: Props) {
  return (
    <Item className="flex h-full py-3">
      <ItemContent className="flex h-full flex-col items-start justify-center gap-1.5">
        <span className="text-muted-foreground font-semibold">{title}</span>
        <span className="**:text-xl">
          <AnimatedNumberChange
            postfix="%"
            value={(bookings * 100) / leads}
            startValue={0}
            Component={TypographySmall}
          />
        </span>
        <span className={cn('text-muted-foreground align-super text-[10px]')}>
          (
          <AnimatedNumberChange
            value={leads}
            Component={TypographyExtraSmall}
            startValue={0}
          />{' '}
          leads →{' '}
          <AnimatedNumberChange value={bookings} Component={TypographyExtraSmall} startValue={0} />{' '}
          bookings)
        </span>
      </ItemContent>
    </Item>
  );
}

export default ConversionBlock;
