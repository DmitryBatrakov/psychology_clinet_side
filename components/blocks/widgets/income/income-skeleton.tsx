import { useMemo } from 'react';

export default function IncomeSkeleton({ length }: { length: number }) {
  const bars = useMemo(
    () =>
      Array.from({ length: length }).map((_, i) => (
        <div
          key={i}
          className="bg-muted rounded-t-0.5 flex-1 animate-pulse"
          style={{ height: `${20 + Math.random() * 60}%` }}
        />
      )),
    [length]
  );
  return (
    <div className="mr-1 mb-7.5 ml-7.5 flex flex-1">
      <div className="flex h-full w-full items-end justify-between gap-1 border-b-[1.5px] border-l-[1.5px] p-0.5">
        {bars}
      </div>
    </div>
  );
}
