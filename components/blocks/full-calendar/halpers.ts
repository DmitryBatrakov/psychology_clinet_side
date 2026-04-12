import {
  addMilliseconds,
  differenceInMilliseconds,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
} from 'date-fns';

type Meeting = { name: string; time: [number, number] };
type Gap = { start: number; end: number };

const STEP = 0.5;

const roundToStep = (x: number, step = STEP) => Math.round(x / step) * step;

/**
 * Нарезает [from, to] на:
 * - сначала до ближайшего целого часа шагом 0.5
 * - потом целые часы по 1
 * - потом хвост 0.5 (если есть)
 */
function pushChunked(gaps: Gap[], from: number, to: number) {
  let s = roundToStep(from);
  const e = roundToStep(to);

  if (e <= s) return;

  // доводим до целого часа шагом 0.5
  while (s < e && s % 1 !== 0) {
    const next = Math.min(e, s + STEP);
    gaps.push({ start: s, end: next });
    s = next;
  }

  // режем по 1 часу
  while (s + 1 <= e) {
    gaps.push({ start: s, end: s + 1 });
    s += 1;
  }

  // хвост
  if (s < e) gaps.push({ start: s, end: e });
}

/** Сливает пересекающиеся и касающиеся интервалы */
function mergeRanges(ranges: Array<[number, number]>): Array<[number, number]> {
  const sorted = ranges.map(([s, e]) => [s, e] as [number, number]).sort((a, b) => a[0] - b[0]);

  const merged: Array<[number, number]> = [];
  for (const [s, e] of sorted) {
    if (!merged.length) {
      merged.push([s, e]);
      continue;
    }
    const last = merged[merged.length - 1];
    // касание тоже считаем слитием: s <= lastEnd
    if (s <= last[1]) last[1] = Math.max(last[1], e);
    else merged.push([s, e]);
  }
  return merged;
}

const getGaps = ({
  meetings,
  workTimeLimit,
}: {
  meetings: Meeting[];
  workTimeLimit: { start: number; end: number };
}) => {
  const gaps: Gap[] = [];

  // как в твоём коде: рабочее окно до end - 1
  const dayStart = workTimeLimit.start;
  const dayEnd = workTimeLimit.end - 1;

  if (dayEnd <= dayStart) return gaps;

  const ranges = meetings.map((m) => m.time);
  if (!ranges.length) {
    pushChunked(gaps, dayStart, dayEnd);
    return gaps;
  }

  const merged = mergeRanges(ranges);

  let cursor = dayStart;

  for (const [busyStartRaw, busyEndRaw] of merged) {
    // сжимаем встречу до рабочего окна
    const busyStart = Math.max(busyStartRaw, dayStart);
    const busyEnd = Math.min(busyEndRaw, dayEnd);

    // если встреча вне окна
    if (busyEnd <= dayStart) continue;
    if (busyStart >= dayEnd) break;

    // свободно до начала встречи
    if (cursor < busyStart) pushChunked(gaps, cursor, busyStart);

    // перескочить за встречу
    cursor = Math.max(cursor, busyEnd);
  }

  // хвост после последней встречи
  if (cursor < dayEnd) pushChunked(gaps, cursor, dayEnd);

  return gaps;
};

const getMiddleDate = (date1: Date, date2: Date): Date => {
  const diff = Math.abs(differenceInMilliseconds(date2, date1));
  const earlier = date1 < date2 ? date1 : date2;
  return addMilliseconds(earlier, diff / 2);
};

function getWeekDates(interval: Date) {
  const week = eachDayOfInterval({
    start: startOfWeek(interval, { weekStartsOn: 0 }),
    end: endOfWeek(interval, { weekStartsOn: 0 }),
  });
  return week;
}

export { getGaps, getMiddleDate, getWeekDates };
