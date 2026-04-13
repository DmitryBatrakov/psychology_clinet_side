import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect } from 'react';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent } from '../../ui/tabs';

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export default function MonthPicker({
  onChange,
  defaultYear,
  defaultMonth,
  triggerProps,
}: {
  defaultYear?: number;
  defaultMonth?: number;
  triggerProps?: React.ComponentProps<typeof Button>;
  onChange?: (month: number | undefined, year: number) => void;
}) {
  const minYear = 2000;
  const maxYear = new Date().getFullYear();
  const yearArray = Array.from({ length: maxYear - minYear + 1 }).map(
    (_, index) => minYear + index
  );

  const [open, setOpen] = React.useState(false);
  const [currYear, setCurrYear] = React.useState(maxYear);
  const [month, setMonth] = React.useState<string | undefined>(
    months[defaultMonth ?? new Date().getMonth()]
  );

  useEffect(() => {
    defaultYear && setCurrYear(defaultYear);
    defaultMonth && setMonth(months[defaultMonth]);
  }, [defaultMonth, defaultYear]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          {...triggerProps}
          className={cn(
            'w-fit cursor-pointer justify-between font-sans! font-normal',
            triggerProps?.className
          )}
        >
          {month ?? 'Mo.'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0 **:font-sans!" align="center">
        <header className="flex items-center p-3">
          <Button
            size={'icon'}
            variant={'outline'}
            className="cursor-pointer"
            disabled={currYear === maxYear}
            onClick={() => currYear < maxYear && setCurrYear((curr) => curr + 1)}
          >
            <ChevronLeft />
          </Button>
          <div className="mx-auto">{currYear}</div>
          <Button
            size={'icon'}
            variant={'outline'}
            className="cursor-pointer"
            disabled={currYear === minYear}
            onClick={() => currYear > minYear && setCurrYear((curr) => curr - 1)}
          >
            <ChevronRight />
          </Button>
        </header>

        <Separator />

        <Tabs value={String(currYear)}>
          {yearArray.map((year, index) => (
            <TabsContent key={year} value={String(year)} className="grid grid-cols-3 gap-1 p-3">
              {months.map((x) => (
                <Button
                  onClick={() => {
                    const isSame = x === month;
                    if (isSame) setMonth(undefined);
                    else setMonth(x);

                    onChange && onChange(isSame ? undefined : (months.indexOf(x) ?? 0), currYear);
                    setTimeout(() => setOpen(false), 150);
                  }}
                  className={cn(
                    'cursor-pointer',
                    x === month && defaultYear === currYear && 'bg-primary! text-white!'
                  )}
                  variant={'ghost'}
                  key={x}
                >
                  {x}
                </Button>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
