"use client";

import { Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCatalogSpecialists } from "@/features/catalog/hooks/useCatalogSpecialists";
import type { CatalogSort } from "@/features/catalog/model/types";
import {
    parseFiltersFromSearchParams,
    parseSortFromSearchParams,
} from "@/features/catalog/utils/parseCatalogParams";
import { PAGE_SIZE } from "@/features/catalog/model/catalogFilterOptions";
import { CatalogFilters } from "@/features/catalog/ui/CatalogFilters";
import { CatalogGrid } from "@/features/catalog/ui/CatalogGrid";
import { CatalogSkeleton } from "@/features/catalog/ui/CatalogSkeleton";

function CatalogPageContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const filters = parseFiltersFromSearchParams(searchParams);
    const sort = parseSortFromSearchParams(searchParams);

    const { data, isPending, isError, error } = useCatalogSpecialists({
        page,
        pageSize: PAGE_SIZE,
        filters,
        sort,
    });

    const setFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (
            value === "any" ||
            (value === "psychologist" && key === "profession")
        ) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        params.delete("page");
        router.push(params.toString() ? `${pathname}?${params}` : pathname);
    };

    const setServices = (services: string[]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("service");
        for (const s of services) params.append("service", s);
        params.delete("page");
        router.push(params.toString() ? `${pathname}?${params}` : pathname);
    };

    const toggleService = (value: string) => {
        const current = filters.services ?? [];
        const next = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        setServices(next);
    };

    const setSort = (value: CatalogSort) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "default") params.delete("sort");
        else params.set("sort", value);
        params.delete("page");
        router.push(params.toString() ? `${pathname}?${params}` : pathname);
    };

    const resetFilters = () => {
        router.push(pathname);
    };

    const createPageUrl = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newPage <= 1) {
            params.delete("page");
            return params.toString() ? `${pathname}?${params}` : pathname;
        }
        params.set("page", String(newPage));
        return `${pathname}?${params}`;
    };

    const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 pb-20" dir="rtl">
            <div className="w-full h-52 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-right mb-5">Catalog</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-full">
                <CatalogFilters
                    filters={filters}
                    sort={sort}
                    searchParams={searchParams}
                    setFilter={setFilter}
                    toggleService={toggleService}
                    setSort={setSort}
                    onReset={resetFilters}
                />
                <CatalogGrid
                    items={data?.items ?? []}
                    page={page}
                    totalPages={totalPages}
                    createPageUrl={createPageUrl}
                    isPending={isPending}
                    isError={isError}
                    error={error ?? null}
                />
            </div>
        </div>
    );
}

function CatalogPageFallback() {
    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 pb-20" dir="rtl">
            <div className="w-full h-52 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-right mb-5">Catalog</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-full">
                <div className="col-span-1 min-h-[400px] rounded-xl border bg-muted/50 animate-pulse" />
                <div className="col-span-3">
                    <CatalogSkeleton count={PAGE_SIZE} />
                </div>
            </div>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={<CatalogPageFallback />}>
            <CatalogPageContent />
        </Suspense>
    );
}
