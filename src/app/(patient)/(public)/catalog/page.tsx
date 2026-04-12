"use client";

import { Suspense, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCatalogSpecialists } from "@/features/catalog/hooks/useCatalogSpecialists";
import type { CatalogSort } from "@/features/catalog/model/types";
import {
    parseFiltersFromSearchParams,
    parseSortFromSearchParams,
} from "@/features/catalog/utils/parseCatalogParams";
import { PAGE_SIZE } from "@/features/catalog/model/catalogFilterOptions";
import {
    CatalogFilters,
    CatalogSortControl,
} from "@/features/catalog/ui/CatalogFilters";
import { CatalogGrid } from "@/features/catalog/ui/CatalogGrid";
import { CatalogSkeleton, CatalogFiltersSkeleton } from "@/features/catalog/ui/CatalogSkeleton";

function computeOffsetCursor(pageNum: number, limit: number): string | null {
    if (pageNum <= 1) return null;
    const offset = (pageNum - 1) * limit;
    const json = JSON.stringify({ offset });
    return btoa(json).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function CatalogPageContent() {
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const filters = parseFiltersFromSearchParams(searchParams);
    const sort = parseSortFromSearchParams(searchParams);
    const currentCursor = computeOffsetCursor(page, PAGE_SIZE);

    const { data, isPending, isError, error } = useCatalogSpecialists({
        cursor: currentCursor,
        limit: PAGE_SIZE,
        filters,
        sort,
    });

    const totalPages = data?.total ? Math.ceil(data.total / PAGE_SIZE) : 0;
    const knownPages =
        totalPages > 0
            ? Array.from({ length: totalPages }, (_, i) => i + 1)
            : [];
    const hasPrev = page > 1;
    const hasNext = Boolean(data?.nextCursor);

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
        params.delete("cursor");
        params.delete("page");
        router.push(params.toString() ? `${pathname}?${params}` : pathname);
    };

    const setServices = (services: string[]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("service");
        for (const s of services) params.append("service", s);
        params.delete("cursor");
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
        params.delete("cursor");
        params.delete("page");
        router.push(params.toString() ? `${pathname}?${params}` : pathname);
    };

    const resetFilters = () => {
        router.push(pathname);
    };

    const createPageUrl = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("cursor");
        if (newPage <= 1) {
            params.delete("page");
            return params.toString() ? `${pathname}?${params}` : pathname;
        }
        const cursor = computeOffsetCursor(newPage, PAGE_SIZE);
        params.set("page", String(newPage));
        if (cursor) params.set("cursor", cursor);
        return `${pathname}?${params}`;
    };

    return (
        <div
            className=" w-full mx-auto px-4 pb-20 flex flex-col items-center justify-center max-w-7xl"
            dir="rtl"
        >
            <div className="w-full h-52 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-right mb-5">Catalog</h1>
            </div>

            <div className="mb-4 flex items-center justify-between gap-3 lg:hidden w-full  md:px-3 ">
                <div className=" flex-1 md:flex-0">
                    <CatalogSortControl sort={sort} setSort={setSort} />
                </div>
                <button
                    type="button"
                    className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    onClick={() => setIsMobileFiltersOpen((prev) => !prev)}
                    aria-expanded={isMobileFiltersOpen}
                >
                    Филтры
                </button>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMobileFiltersOpen
                        ? "max-h-450 opacity-100 mb-4"
                        : "max-h-0 opacity-0"
                }`}
            >
                <CatalogFilters
                    filters={filters}
                    sort={sort}
                    searchParams={searchParams}
                    setFilter={setFilter}
                    toggleService={toggleService}
                    setSort={setSort}
                    onReset={resetFilters}
                    hideSort
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 w-full">
                <div className="hidden lg:block">
                    <CatalogFilters
                        filters={filters}
                        sort={sort}
                        searchParams={searchParams}
                        setFilter={setFilter}
                        toggleService={toggleService}
                        setSort={setSort}
                        onReset={resetFilters}
                    />
                </div>
                <CatalogGrid
                    items={data?.items ?? []}
                    page={page}
                    knownPages={knownPages}
                    hasPrev={hasPrev}
                    hasNext={hasNext}
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
        <div className="w-full mx-auto px-4 pb-20 flex flex-col items-center justify-center max-w-7xl" dir="rtl">
            <div className="w-full h-52 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-right mb-5">Catalog</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 w-full">
                <div className="hidden lg:block">
                    <CatalogFiltersSkeleton />
                </div>
                <CatalogSkeleton count={PAGE_SIZE} />
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
