const сalculateLoss = (data: Array<Record<string, any>>) =>
  data.map((item) => ({ ...item, loss: item.income === 0 ? 0 : item.expected - item.income }));

const getDayData = () =>
  Array.from({ length: 24 }, (_, h) => ({
    x: `2026-01-09T${String(h).padStart(2, '0')}:00:00`,
    expected: 5 + (h % 6),
    income: 3 + (h % 5),
  }));

const getPeriodData = (length: number) =>
  Array.from({ length: length }, (_, d) => ({
    x: `2026-01-${String(d + 1).padStart(2, '0')}`,
    expected: 15 + (d % 6),
    income: 13 + (d % 5),
  }));

const getYearData = (year: number, length: number) =>
  Array.from({ length: length }, (_, y) => ({
    x: `${year}-${String(y + 1).padStart(2, '0')}-01`,
    expected: 15 + Math.round(Math.random() * 20 + 10),
    income: 13 + Math.round(Math.random() * 10 + 10),
  }));

const getMonthData = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, '0');
    const m = String(month + 1).padStart(2, '0');

    const expected = Math.round(10 + Math.random() * 6);
    const currentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

    return {
      x: `${year}-${m}-${day}`,
      expected: expected,
      income:
        new Date().getDate() >= Number(day)
          ? Math.round(expected - Math.random() * expected + Math.random() * 5)
          : !currentMonth
            ? Math.round(expected - Math.random() * expected)
            : 0,
    };
  });
};

export { getDayData, getPeriodData, getYearData, getMonthData, сalculateLoss };
