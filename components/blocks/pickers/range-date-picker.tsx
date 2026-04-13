'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { DateRange } from 'react-day-picker';

export function RangeDatePicker({
  open,
  onChange,
  onOpenChange,
  defaultRange,
}: {
  open?: boolean;
  defaultRange?: DateRange;
  onOpenChange?: (state: boolean) => void;
  onChange?: (range: DateRange | undefined) => void;
}) {
  const [range, setRange] = React.useState<DateRange | undefined>(defaultRange);
  React.useEffect(() => setRange(defaultRange), [defaultRange]);

  return (
    <Popover
      open={open}
      onOpenChange={(state) => {
        onChange && onChange(range);
        onOpenChange && onOpenChange(state);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!range}
          className="data-[empty=true]:text-muted-foreground w-full cursor-pointer justify-start text-left font-normal"
        >
          <CalendarIcon />
          {range?.from && range.to ? (
            `${format(range.from, 'dd/MM/yyyy')} - ${format(range.to, 'dd/MM/yyyy')}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={1} />
        <div className="w-full px-3 pb-3">
          <PopoverClose asChild>
            <Button
              disabled={!Boolean(range?.from)}
              className="w-full cursor-pointer"
              onClick={() => onChange && onChange(range)}
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
