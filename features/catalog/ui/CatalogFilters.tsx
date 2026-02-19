"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, RotateCcwIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogFilters as CatalogFiltersType, CatalogSort } from "@/features/catalog/model/types";
import {
    SERVICE_TOPICS_BY_PROFESSION,
    getAllServiceValues,
    getServiceLabel,
} from "@/features/catalog/model/serviceTopics";
import {
    FILTER_ANY,
    PROFESSION_OPTIONS,
    GENDER_OPTIONS,
    MEETING_FORMAT_OPTIONS,
    SESSION_TYPE_OPTIONS,
    LANGUAGE_OPTIONS,
    PRICE_RANGE_OPTIONS,
    SORT_OPTIONS,
} from "@/features/catalog/model/catalogFilterOptions";

export interface CatalogFiltersProps {
    filters: CatalogFiltersType;
    sort: CatalogSort;
    searchParams: URLSearchParams;
    setFilter: (key: string, value: string) => void;
    toggleService: (value: string) => void;
    setSort: (value: CatalogSort) => void;
    onReset: () => void;
}

export function CatalogFilters({
    filters,
    sort,
    searchParams,
    setFilter,
    toggleService,
    setSort,
    onReset,
}: CatalogFiltersProps) {
    const currentPriceRange = (() => {
        const fromUrl = searchParams.get("priceRange");
        if (fromUrl && PRICE_RANGE_OPTIONS.some((o) => o.value === fromUrl)) return fromUrl;
        const pr = PRICE_RANGE_OPTIONS.find(
            (o) => o.priceMin === filters.priceMin && o.priceMax === filters.priceMax
        );
        if (pr) return pr.value;
        if (filters.priceMin != null && filters.priceMax == null) return "300+";
        return FILTER_ANY;
    })();
    const professionForServices = filters.profession ?? "psychologist";
    const serviceGroups = SERVICE_TOPICS_BY_PROFESSION[professionForServices];
    const allowedServiceValues = getAllServiceValues(professionForServices);
    const selectedServices = (filters.services ?? []).filter((s) => allowedServiceValues.has(s));
    const servicesTriggerLabel =
        selectedServices.length === 0
            ? "כל התמות"
            : selectedServices.length === 1
              ? getServiceLabel(selectedServices[0])
              : `תמות: ${selectedServices.length}`;

    return (
        <div className="col-span-1 space-y-4">
            <div>
                <label className="text-sm font-medium text-right block mb-2">מקצוע</label>
                <Select
                    value={filters.profession ?? "psychologist"}
                    onValueChange={(v) => setFilter("profession", v)}
                >
                    <SelectTrigger className="w-full justify-between" dir="rtl">
                        <SelectValue placeholder="בחר מקצוע" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" position="popper">
                        {PROFESSION_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="text-sm font-medium text-right block mb-2">מין</label>
                <Select
                    value={filters.gender ?? FILTER_ANY}
                    onValueChange={(v) => setFilter("gender", v)}
                >
                    <SelectTrigger className="w-full justify-between" dir="rtl">
                        <SelectValue placeholder="כל" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" position="popper">
                        {GENDER_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="text-sm font-medium text-right block mb-2">פורמט פגישה</label>
                <Select
                    value={filters.meetingFormat ?? FILTER_ANY}
                    onValueChange={(v) => setFilter("meetingFormat", v)}
                >
                    <SelectTrigger className="w-full justify-between" dir="rtl">
                        <SelectValue placeholder="כל" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" position="popper">
                        {MEETING_FORMAT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="text-sm font-medium text-right block mb-2">סוג פגישה</label>
                <Select
                    value={filters.sessionType ?? FILTER_ANY}
                    onValueChange={(v) => setFilter("sessionType", v)}
                >
                    <SelectTrigger className="w-full justify-between" dir="rtl">
                        <SelectValue placeholder="כל" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" position="popper">
                        {SESSION_TYPE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="text-sm font-medium text-right block mb-2">שפה</label>
                <Select
                    value={filters.language ?? FILTER_ANY}
                    onValueChange={(v) => setFilter("language", v)}
                >
                    <SelectTrigger className="w-full justify-between" dir="rtl">
                        <SelectValue placeholder="כל" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" position="popper">
                        {LANGUAGE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="text-sm font-medium text-right block mb-2">Темы</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-full justify-between font-normal text-right",
                                selectedServices.length === 0 && "text-muted-foreground"
                            )}
                            dir="rtl"
                        >
                            {servicesTriggerLabel}
                            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-(--radix-popover-trigger-width) px-1" align="start" side="bottom"  sideOffset={5}  avoidCollisions={false}>
                        <div className="max-h-[min(60vh,400px)] overflow-y-auto p-2">
                            {serviceGroups.map((group) => (
                                <div key={group.groupLabel} className="mb-3 last:mb-0">
                                    <p className="text-xs font-medium text-muted-foreground px-2 py-1.5 text-right" dir="rtl">
                                        {group.groupLabel}
                                    </p>
                                    <div className="space-y-1">
                                        {group.items.map((item) => (
                                            <label
                                                key={item.value}
                                                className="flex items-center gap-2 rounded-sm py-1.5 px-2 hover:bg-accent cursor-pointer text-right"
                                                dir="rtl"
                                            >
                                                <Checkbox
                                                    checked={selectedServices.includes(item.value)}
                                                    onCheckedChange={() => toggleService(item.value)}
                                                />
                                                <span className="text-sm">{item.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div>
                <label className="text-sm font-medium text-right block mb-2">מחיר לפגישה</label>
                <Select
                    value={currentPriceRange}
                    onValueChange={(v) => setFilter("priceRange", v)}
                >
                    <SelectTrigger className="w-full justify-between" dir="rtl">
                        <SelectValue placeholder="כל" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" position="popper">
                        {PRICE_RANGE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="text-sm font-medium text-right block mb-2">מיון</label>
                <Select value={sort} onValueChange={(v) => setSort(v as CatalogSort)}>
                    <SelectTrigger className="w-full justify-between" dir="rtl">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" position="popper">
                        {SORT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button
                type="button"
                variant="outline"
                className="w-full justify-center gap-2"
                onClick={onReset}
                dir="rtl"
            >
                <RotateCcwIcon className="h-4 w-4" />
                איפוס סינון
            </Button>
        </div>
    );
}
