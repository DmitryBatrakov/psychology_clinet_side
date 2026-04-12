'use client';
import { AnimatedNumberChange } from '@/components/blocks/motion/animated-number-change';
import { TypographyExtraSmall } from '@/components/blocks/typography/typography-extra-small';
import { Item, ItemContent } from '@/components/ui/item';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Props {
  prev: number;
  value: number;
  title: string;
  service_name: string;
}

function UnpopularServicBlock({ prev, title, value, service_name }: Props) {
  return (
    <Item className="flex h-full py-3">
      <ItemContent className="flex h-full flex-col items-start justify-center gap-1.5 overflow-hidden">
        <span className="text-muted-foreground font-semibold">{title}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                'w-full overflow-hidden text-base leading-5.25 font-semibold text-nowrap text-ellipsis',
                'text-red-600'
              )}
            >
              {service_name}
            </span>
          </TooltipTrigger>
          <TooltipContent>{service_name}</TooltipContent>
        </Tooltip>
        <span className={cn('align-super text-[10px] opacity-50', 'text-red-600')}>
          <AnimatedNumberChange value={value} Component={TypographyExtraSmall} startValue={prev} />{' '}
          orders vs last month
        </span>
      </ItemContent>
    </Item>
  );
}

export default UnpopularServicBlock;
