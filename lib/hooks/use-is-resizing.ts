import { useLayoutEffect, useRef, useState } from 'react';

type Options = {
  delay?: number;
};

type Size = { width: number; height: number };

export function useIsResizing<T extends HTMLElement = HTMLDivElement>({
  delay = 100,
}: Options = {}) {
  const ref = useRef<T | null>(null);

  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState<Size | null>(null);

  const delayRef = useRef(delay);
  delayRef.current = delay;

  const timerRef = useRef<number | null>(null);
  const resizingRef = useRef(false);
  const prevRef = useRef<Size | null>(null);
  const didInitRef = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const clearTimer = () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const read = (): Size => ({
      width: el.offsetWidth,
      height: el.offsetHeight,
    });

    // Инициализация размера один раз
    const initial = read();
    prevRef.current = initial;
    if (!didInitRef.current) {
      didInitRef.current = true;
      setSize(initial);
    }

    const endLater = () => {
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        resizingRef.current = false;
        setIsResizing(false);
        timerRef.current = null;
      }, delayRef.current);
    };

    const ro = new ResizeObserver(() => {
      const next = read();
      const prev = prevRef.current;

      if (prev && next.width === prev.width && next.height === prev.height) return;
      prevRef.current = next;

      // isResizing=true только один раз за серию
      if (!resizingRef.current) {
        resizingRef.current = true;
        setIsResizing(true);
      }

      // size обновляем только при реальном изменении
      setSize(next);

      endLater();
    });

    ro.observe(el);

    return () => {
      ro.disconnect();
      clearTimer();
      resizingRef.current = false;
    };
  }, []);

  return { ref, isResizing, size };
}
