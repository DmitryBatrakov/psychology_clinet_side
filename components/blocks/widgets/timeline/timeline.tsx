import { Item } from '@/components/ui/item';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Activity, ComponentProps, useState } from 'react';
import TimelineCalendar from './timeline-calendar';
import TimelineChart from './timeline-chart';

type Props = ComponentProps<typeof Item> & { isResizing: boolean };

type Outcome = 'success' | 'error' | 'pending';

export type TimelineRow = {
  name: string; // клиент
  type: 'TR' | 'MT';
  outcome: 'success' | 'error' | 'pending';
  first: [number, number]; // минуты от начала дня
};

export const timelineData: TimelineRow[] = [
  { name: 'Anna Cohen', type: 'TR', outcome: 'success', first: [0, 60] }, // 00–01 (1 раз)
  { name: 'Alex Johnson', type: 'MT', outcome: 'success', first: [60, 120] }, // 01–03 (2 раза)
  { name: 'Maria Gonzales', type: 'TR', outcome: 'error', first: [180, 240] }, // 03–04 (1 раз)
  { name: 'Daniel Smith', type: 'MT', outcome: 'success', first: [240, 300] }, // 04–06 (2 раза)
  { name: 'Sophie Müller', type: 'TR', outcome: 'pending', first: [360, 420] }, // 06–07 (1 раз)
  { name: 'Liam O’Connor', type: 'MT', outcome: 'success', first: [420, 480] }, // 07–09 (2 раза)
  { name: 'Emma Wilson', type: 'TR', outcome: 'success', first: [540, 600] }, // 09–10 (1 раз)
  { name: 'Noah Brown', type: 'MT', outcome: 'error', first: [600, 660] }, // 10–12 (2 раза)
  { name: 'Isabella Rossi', type: 'TR', outcome: 'success', first: [720, 780] }, // 12–13 (1 раз)
  { name: 'Ethan Lee', type: 'MT', outcome: 'pending', first: [780, 840] }, // 13–14 (1 раз)
  { name: 'Olivia Martin', type: 'TR', outcome: 'success', first: [840, 900] }, // 14–16 (2 раза)
  { name: 'Benjamin Clark', type: 'MT', outcome: 'success', first: [960, 1020] }, // 16–17 (1 раз)
  { name: 'Chloe Dubois', type: 'TR', outcome: 'error', first: [1020, 1080] }, // 17–18 (1 раз)
  { name: 'Yuki Tanaka', type: 'MT', outcome: 'success', first: [1080, 1140] }, // 18–19 (1 раз)
  { name: 'Omar Hassan', type: 'TR', outcome: 'pending', first: [1140, 1200] }, // 19–20 (1 раз)
  { name: 'Sara Levi', type: 'MT', outcome: 'success', first: [1200, 1260] }, // 20–21 (1 раз)
  { name: 'Pavel Ivanov', type: 'TR', outcome: 'success', first: [1260, 1320] }, // 21–22 (1 раз)
  { name: 'Nina Petrova', type: 'MT', outcome: 'error', first: [1320, 1380] }, // 22–23 (1 раз)
  { name: 'Igor Sokolov', type: 'TR', outcome: 'success', first: [1380, 1440] }, // 23–24 (1 раз)
];

export const colorByOutcome: Record<Outcome, string> = {
  success: '#64c469', // green
  error: '#ef4444', // red
  pending: '#9ca3af', // grey
};

function Timeline({ isResizing, ...rest }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Item
      {...rest}
      className={cn('min-w-113.5 flex-col shadow-[0_0_4px_0] shadow-black/15', rest.className)}
    >
      <Activity mode={showDetails ? 'hidden' : 'visible'}>
        <TimelineCalendar
          selected={date}
          isResizing={isResizing}
          onSelect={(d) => {
            d && setDate(d);
            setShowDetails(true);
          }}
        />
      </Activity>
      <Activity mode={showDetails ? 'visible' : 'hidden'}>
        <TimelineChart
          isResizing={isResizing}
          onReturn={() => setShowDetails(false)}
          label={date && format(date, 'eeee, MMMM dd, yyyy')}
        />
      </Activity>
    </Item>
  );
}

export default Timeline;
