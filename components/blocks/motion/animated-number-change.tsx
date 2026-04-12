import { animate, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import { ComponentProps, ComponentType, useEffect, useState } from 'react';

type AnimatedNumberChangeProps<T extends ComponentType<any>> = {
  Component: T;
  value: number;
  fixed?: number;
  startValue?: number;
  postfix?: string | undefined;
  prefix?: string | undefined;
} & Omit<ComponentProps<T>, 'children'>;

export function AnimatedNumberChange<T extends ComponentType<any>>({
  value,
  prefix,
  postfix,
  startValue,
  Component,
  fixed,
  ...rest
}: AnimatedNumberChangeProps<T>) {
  const motionValue = useMotionValue(startValue || 0);
  const [displayValue, setDisplayValue] = useState((startValue === value && startValue) || 0);
  const rounded = useTransform(motionValue, (v) => {
    const factor = 10 ** (fixed || 1);
    return Math.round(v * factor) / factor;
  });

  useMotionValueEvent(rounded, 'change', (latest) => setDisplayValue(latest));

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.5 });
    return controls.stop;
  }, [value, motionValue]);

  return (
    <Component
      {...(rest as any)}
    >{`${prefix ?? ''}${displayValue.toFixed(fixed)}${postfix ?? ''}`}</Component>
  );
}
