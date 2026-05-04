import { formatDateTime } from '@/lib/utils';
import { toDateKey } from '@/lib/func/to-date-key/toDateKey';
import { formatHeDate } from '@/features/calendar/lib/modal-helpers';
import { getDisplayTimes } from './sessionDisplayTime';
import type { ScheduleDayItem } from '../model/types';

export type DateGroup = { key: string; label: string; items: ScheduleDayItem[] };

export function buildDateLabel(isoStartAt: string): string {
    const d = new Date(isoStartAt);
    const key = toDateKey(d);
    const todayKey = toDateKey(new Date());
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (key === todayKey) return `היום - ${formatHeDate(d)}`;
    if (key === toDateKey(tomorrow)) return `מחר - ${formatHeDate(tomorrow)}`;
    return formatHeDate(d);
}

export function formatTimeRange(startAt: string, endAt?: string | null): string {
    const [start, end] = getDisplayTimes(startAt, endAt);
    const startStr = formatDateTime(start, { mode: 'time' });
    return end ? `${startStr} – ${formatDateTime(end, { mode: 'time' })}` : startStr;
}

export function groupByDate(items: ScheduleDayItem[]): DateGroup[] {
    const map = new Map<string, ScheduleDayItem[]>();
    for (const item of items) {
        const key = toDateKey(new Date(item.session.startAt));
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(item);
    }
    return Array.from(map.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, items]) => ({ key, label: buildDateLabel(items[0].session.startAt), items }));
}
