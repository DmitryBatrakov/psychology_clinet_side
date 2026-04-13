import { useMemo } from 'react';

export default function WorkloadSkeleton() {
  const num = useMemo(() => Math.round(Math.random() * 100), []);
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
      <div className="flex aspect-square h-full items-center justify-center rounded-full border-18">
        <div className="flex flex-col items-center justify-center">
          <span className="text-2xl">{num}%</span>
          <span className="text-xs">Compleated</span>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-x-3 gap-y-2">
        <div className="bg-muted h-4 w-32" />
        <div className="bg-muted h-4 w-32" />
        <div className="bg-muted h-4 w-32" />
      </div>
    </div>
  );
}
