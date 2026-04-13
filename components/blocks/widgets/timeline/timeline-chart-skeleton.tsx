import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export default function TimelineChartSkeleton({ length }: { length: number }) {
  const bars = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="bg-muted rounded-t-0.5 size-full animate-pulse"
          style={{ gridRowStart: i + 1, gridColumnStart: i + 1 }}
        />
      )),
    [length]
  );

  return (
    <div className="mr-1 mb-7.5 ml-7.5 flex flex-1">
      <div
        style={{
          gridTemplateRows: `repeat(${length}, minmax(0, 1fr))`,
        }}
        className="grid h-full w-full grid-cols-19 items-end justify-between border-b-[1.5px] p-0.5"
      >
        {bars}
      </div>
    </div>
  );
}
