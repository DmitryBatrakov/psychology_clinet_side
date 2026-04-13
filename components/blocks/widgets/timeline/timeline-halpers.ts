export function mmToHHMM(mm: number) {
  const h = Math.floor(mm / 60);
  const m = Math.round(mm % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
