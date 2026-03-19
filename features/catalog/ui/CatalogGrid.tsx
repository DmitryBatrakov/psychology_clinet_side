"use client";

import type { SpecialistDTO } from "@/features/specialist/model/types";
import { CatalogSpecialistCard } from "@/features/catalog/ui/CatalogSpecialistCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { PAGE_SIZE, PROFESSION_SECTIONS } from "@/features/catalog/model/catalogFilterOptions";
import { CatalogSkeleton } from "./CatalogSkeleton";



export interface CatalogGridProps {
    items: SpecialistDTO[];
    page: number;
    totalPages: number;
    createPageUrl: (page: number) => string;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
}

export function CatalogGrid({
    items,
    page,
    totalPages,
    createPageUrl,
    isPending,
    isError,
    error,
}: CatalogGridProps) {
    if (isPending) {
        return (
            <div className="col-span-1 md:col-span-3">
                <CatalogSkeleton  count={PAGE_SIZE}/>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="col-span-1 md:col-span-3">
                <p className="text-destructive text-right">
                    שגיאה בטעינה: {error?.message ?? "נסה שוב מאוחר יותר"}
                </p>
            </div>
        );
    }

    const byProfession = items.reduce(
        (acc, specialist) => {
            const list = acc[specialist.profession] ?? [];
            list.push(specialist);
            acc[specialist.profession] = list;
            return acc;
        },
        {} as Record<"psychologist" | "therapist" | "coach", typeof items>,
    );

    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    return (
        <div className=" h-full">
            <div className="space-y-8 w-full pb-6">
                {PROFESSION_SECTIONS.map(({ key, title }) => {
                    const list = byProfession[key] ?? [];
                    if (list.length === 0) return null;
                    return (
                        <section key={key}>
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,330px))] gap-4 justify-center items-center">
                                {list.map((specialist) => (
                                    <CatalogSpecialistCard
                                        key={specialist.id}
                                        specialist={specialist}
                                    />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
            {totalPages > 1 && (
                <Pagination className="mt-6">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={createPageUrl(page - 1)}
                                aria-disabled={!hasPrev}
                                className={
                                    !hasPrev
                                        ? "pointer-events-none opacity-50"
                                        : undefined
                                }
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter((p) => {
                                if (totalPages <= 7) return true;
                                if (p === 1 || p === totalPages) return true;
                                if (Math.abs(p - page) <= 1) return true;
                                return false;
                            })
                            .map((p, idx, arr) => (
                                <PaginationItem key={p}>
                                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                                        <PaginationEllipsis />
                                    )}
                                    <PaginationLink
                                        href={createPageUrl(p)}
                                        isActive={p === page}
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        <PaginationItem>
                            <PaginationNext
                                href={createPageUrl(page + 1)}
                                aria-disabled={!hasNext}
                                className={
                                    !hasNext
                                        ? "pointer-events-none opacity-50"
                                        : undefined
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
