import {
  addMilliseconds,
  differenceInMilliseconds,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
} from 'date-fns';

type Meeting = { name: string; time: [number, number] };
type Gap = { start: number; end: number };

function pushChunked(gaps: Gap[], from: number, to: number) {
  let s = Math.ceil(from);
  const e = Math.floor(to);

  while (s + 1 <= e) {
    gaps.push({ start: s, end: s + 1 });
    s += 1;
  }
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

  const dayStart = workTimeLimit.start;
  const dayEnd = workTimeLimit.end;

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

type OverlapLayout = { columnIndex: number; totalColumns: number };

function computeOverlapLayout(meetings: Meeting[]): OverlapLayout[] {
  const n = meetings.length;
  if (!n) return [];

  const order = Array.from({ length: n }, (_, i) => i).sort(
    (a, b) => meetings[a].time[0] - meetings[b].time[0]
  );

  const columnOf = new Array<number>(n).fill(-1);
  const colEnd: number[] = [];

  for (const i of order) {
    const [s, e] = meetings[i].time;
    let col = colEnd.findIndex((end) => end <= s);
    if (col === -1) col = colEnd.length;
    columnOf[i] = col;
    colEnd[col] = e;
  }

  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const [s1, e1] = meetings[i].time;
      const [s2, e2] = meetings[j].time;
      if (s1 < e2 && s2 < e1) parent[find(i)] = find(j);
    }
  }

  const groupMax: Record<number, number> = {};
  for (let i = 0; i < n; i++) {
    const root = find(i);
    groupMax[root] = Math.max(groupMax[root] ?? 0, columnOf[i] + 1);
  }

  return meetings.map((_, i) => ({
    columnIndex: columnOf[i],
    totalColumns: groupMax[find(i)],
  }));
}

export { computeOverlapLayout, getGaps, getMiddleDate, getWeekDates };
