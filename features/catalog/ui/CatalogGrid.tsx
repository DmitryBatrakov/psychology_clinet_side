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
} from "@/components/ui/pagination";
import {
    PAGE_SIZE,
    PROFESSION_SECTIONS,
} from "@/features/catalog/model/catalogFilterOptions";
import { CatalogSkeleton } from "./CatalogSkeleton";

export interface CatalogGridProps {
    items: SpecialistDTO[];
    page: number;
    knownPages: number[];
    hasPrev: boolean;
    hasNext: boolean;
    createPageUrl: (page: number) => string;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
}

export function CatalogGrid({
    items,
    page,
    knownPages,
    hasPrev,
    hasNext,
    createPageUrl,
    isPending,
    isError,
    error,
}: CatalogGridProps) {
    if (isPending) {
        return (
            <div className="col-span-1 md:col-span-3">
                <CatalogSkeleton count={PAGE_SIZE} />
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

    return (
        <div className=" h-full ">
            <div className="space-y-8 w-full pb-6 max-w-4xl">
                {PROFESSION_SECTIONS.map(({ key, title }) => {
                    const list = byProfession[key] ?? [];
                    if (list.length === 0) return null;
                    return (
                        <section key={key}>
                            <div className="grid grid-cols-1 px-4 md:px-0 items-center justify-center  md:grid-cols-[repeat(auto-fit,minmax(270px,280px))] gap-4  md:justify-start md:items-start">
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
            {(hasPrev || hasNext) && (
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
                        {knownPages.map((knownPage) => (
                            <PaginationItem key={knownPage}>
                                <PaginationLink
                                    href={createPageUrl(knownPage)}
                                    isActive={knownPage === page}
                                >
                                    {knownPage}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {/* pagination with ellipsis */}
                        {/* {knownPages.flatMap((knownPage, idx) => {
                            const nodes = [];
                            if (idx > 0 && knownPages[idx - 1] !== knownPage - 1) {
                                nodes.push(
                                    <PaginationItem key={`ellipsis-${knownPage}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }
                            nodes.push(
                                <PaginationItem key={knownPage}>
                                    <PaginationLink
                                        href={createPageUrl(knownPage)}
                                        isActive={knownPage === page}
                                    >
                                        {knownPage}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                            return nodes;
                        })} */}
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
