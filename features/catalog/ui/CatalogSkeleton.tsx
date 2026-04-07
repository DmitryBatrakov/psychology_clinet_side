export function CatalogFiltersSkeleton() {
    return (
        <div className="space-y-4" dir="rtl">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                    <div className="h-4 w-24 rounded bg-accent/10 animate-pulse mb-2 mr-auto" />
                    <div className="h-9 w-full rounded-md bg-accent/10 animate-pulse" />
                </div>
            ))}
            <div className="h-9 w-full rounded-md bg-accent/10 animate-pulse" />
        </div>
    );
}

export function CatalogSkeleton({ count }: { count: number }) {
    return (
        <div
            className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-[repeat(auto-fit,minmax(270px,280px))] gap-4 md:justify-start"
            dir="rtl"
        >
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl border h-112.5 animate-pulse bg-accent/10"
                />
            ))}
        </div>
    );
}
