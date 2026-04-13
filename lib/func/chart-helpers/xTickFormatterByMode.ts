const xTickFormatterByMode = (mode: 'year' | 'month' | 'week' | 'day') => (value: Date) => {
  const d = new Date(value);

  if (mode === 'year') {
    // Jan, Feb...
    return new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  }

  if (mode === 'month') {
    // 1, 2, 3... (день месяца)
    return String(d.getDate());
  }

  if (mode === 'week') {
    // Mon, Tue...
    return new Intl.DateTimeFormat('en', { weekday: 'short' }).format(d);
  }

  // day
  // 00:00, 01:00...
  return new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d);
};

export { xTickFormatterByMode };
