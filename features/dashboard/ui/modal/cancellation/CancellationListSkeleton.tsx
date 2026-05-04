import { Skeleton } from '@/components/ui/skeleton';

export function CancellationListSkeleton() {
    return (
        <div className="space-y-1 p-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex flex-1 flex-col gap-1.5">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-3 w-14" />
                </div>
            ))}
        </div>
    );
}
