'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Item, ItemContent, ItemFooter, ItemHeader } from '@/components/ui/item';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { getMonth, getYear } from 'date-fns';
import { Ellipsis, Undo2 } from 'lucide-react';
import { motion } from 'motion/react';
import React, { ComponentProps, useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import MonthPicker from '../pickers/month-picker';
import { RangeDatePicker } from '../pickers/range-date-picker';
import YearPicker from '../pickers/year-picker';
import {
  DateStorageContext,
  Period,
  periods,
  PeriodStorageContext,
  WidgetStorage,
  WidgetStoregeContext,
} from './widget-storage';

export type WidgetProps = Omit<ComponentProps<typeof Item>, 'variant'> & {
  variant?: 'default' | 'compact';
};

const WidgetContext = React.createContext(false);
const WidgetHeaderContext = React.createContext(false);

function WidgetInner({ children, variant = 'default', className, ...rest }: WidgetProps) {
  const { isResizing, containerRef } = useContext(WidgetStoregeContext);

  return (
    <WidgetContext.Provider value={true}>
      <Item
        {...rest}
        ref={containerRef}
        className={cn(
          'relative h-full min-h-0 shrink flex-col items-start gap-3 p-3 transition-all',
          variant === 'default' && 'min-h-75 shadow-[0_0_4px_0] shadow-black/15',
          variant === 'compact' && 'min-h-fit bg-transparent p-0',
          isResizing && 'pointer-events-none blur-[2px] grayscale-100',
          className
        )}
      >
        {children}
      </Item>
    </WidgetContext.Provider>
  );
}

function Widget({ children, ...rest }: WidgetProps) {
  return (
    <WidgetStorage>
      <WidgetInner {...rest}>{children}</WidgetInner>
    </WidgetStorage>
  );
}

Widget.Header = function WidgetHeader({
  children,
  className,
  ...rest
}: ComponentProps<typeof ItemHeader>) {
  const insideWidget = React.useContext(WidgetContext);

  if (!insideWidget) {
    throw new Error('Widget.PeriodSelect можно использовать только внутри Widget');
  }

  return (
    <WidgetHeaderContext.Provider value={true}>
      <ItemHeader {...rest} className={cn('min-h-fit w-full basis-0 items-start', className)}>
        {children}
      </ItemHeader>
    </WidgetHeaderContext.Provider>
  );
};

Widget.DateSelect = function WidgetDateSelect() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange | undefined>();

  const { year, month, setYear, range, history, setMonth, setRange, prevHistory, updateHistory } =
    useContext(DateStorageContext);

  useEffect(() => setTempRange(range), [range]);

  return (
    <div className="flex gap-2">
      <Button
        size={'icon-sm'}
        variant="outline"
        onClick={prevHistory}
        className="cursor-pointer"
        disabled={!Boolean(history.length)}
      >
        <Undo2 />
      </Button>

      <YearPicker
        onChange={(y) => {
          updateHistory();
          setRange(undefined);
          setYear(y);
        }}
        defaultYear={year}
        triggerProps={{ size: 'sm' }}
      />

      <MonthPicker
        defaultYear={year}
        defaultMonth={month}
        onChange={(m, y) => {
          updateHistory();
          setRange(undefined);
          setMonth(m);
          setYear(y);
        }}
        triggerProps={{ size: 'sm' }}
      />

      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={'icon-sm'} className="cursor-pointer">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-fit p-0"
          onInteractOutside={(e) => pickerOpen && e.preventDefault()}
        >
          <Item className="w-68.5 gap-2 p-3">
            <ItemHeader>Choose a range</ItemHeader>
            <ItemContent className="*:flex *:items-center">
              <RangeDatePicker
                open={pickerOpen}
                defaultRange={tempRange}
                onOpenChange={setPickerOpen}
                onChange={(value) => setTempRange(value)}
              />
            </ItemContent>
            <ItemFooter>
              <Button
                className="w-full cursor-pointer"
                disabled={!Boolean(tempRange?.from)}
                onClick={() => {
                  updateHistory();

                  setMenuOpen(false);
                  if (tempRange?.from) {
                    setRange(tempRange);
                    setYear(getYear(tempRange?.from));
                    setMonth(getMonth(tempRange?.from));
                  }
                }}
              >
                Show
              </Button>
            </ItemFooter>
          </Item>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
(Widget.DateSelect as any).__TYPE = 'DateSelect';

Widget.PeriodSelect = function WidgetPeriodSelect({
  onChange,
  ...rest
}: Omit<ComponentProps<typeof Select>, 'onValueChange'> & {
  onChange?: (period: Period, prevPeriod: Period) => void;
}) {
  const { period, setPeriod, setPrevPeriod } = useContext(PeriodStorageContext);

  const insideWidget = React.useContext(WidgetContext);

  if (!insideWidget) {
    throw new Error('Widget.PeriodSelect можно использовать только внутри Widget');
  }

  return (
    <Select
      value={period}
      onValueChange={(new_period: Period) => {
        onChange?.(new_period, period);
        setPrevPeriod(period);
        setPeriod(new_period);
      }}
      {...rest}
    >
      <SelectTrigger
        size="sm"
        className="hover:bg-accent min-w-20.75 cursor-pointer capitalize transition-all"
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent position="popper" side="bottom" align="end">
        <SelectGroup>
          {periods.map((item, index) => (
            <SelectItem className="cursor-pointer capitalize" key={`${item}-${index}`} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
(Widget.PeriodSelect as any).__TYPE = 'PeriodSelect';

Widget.Title = function WidgetTitle({ children, className, ...rest }: ComponentProps<'span'>) {
  const insideHeader = React.useContext(WidgetHeaderContext);

  if (!insideHeader) {
    throw new Error('Widget.Title можно использовать только внутри Widget.Header');
  }

  return (
    <span {...rest} className={cn('flex items-center gap-1', className)}>
      {children}
    </span>
  );
};

Widget.Content = function WidgetContent({
  children,
  className,
  skeleton,
  heavy = false,
  ...rest
}: ComponentProps<typeof ItemContent> & { skeleton?: React.ReactNode; heavy?: boolean }) {
  const insideWidget = React.useContext(WidgetContext);

  const { isResizing } = useContext(WidgetStoregeContext);

  if (!insideWidget) {
    throw new Error('Widget.PeriodSelect можно использовать только внутри Widget');
  }

  return (
    <ItemContent className={cn('flex w-full flex-1', className)} {...rest}>
      <motion.div
        key={'content'}
        transition={{ duration: 0.3 }}
        className="flex flex-1"
        animate={{ opacity: isResizing && skeleton ? 0 : 1 }}
      >
        {heavy ? !isResizing && children : children}
      </motion.div>
      {skeleton && (
        <motion.div
          key={'skeleton'}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          animate={{ opacity: isResizing ? 1 : 0 }}
          className="pointer-events-none absolute inset-0 bottom-0 left-0 flex flex-1 items-center justify-center blur-[2px]"
        >
          {skeleton}
        </motion.div>
      )}
    </ItemContent>
  );
};

Widget.Footer = function WidgetFooter({
  children,
  className,
  ...rest
}: ComponentProps<typeof ItemFooter>) {
  const insideWidget = React.useContext(WidgetContext);

  if (!insideWidget) {
    throw new Error('Widget.Footer можно использовать только внутри Widget');
  }

  return (
    <ItemFooter {...rest} className={cn('min-h-fit w-full basis-0', className)}>
      {children}
    </ItemFooter>
  );
};

export default Widget;
