export function CatalogSkeleton({ count }: { count: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full" dir="rtl">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl border bg-card h-[450px] animate-pulse"
                />
            ))}
        </div>
    );
}