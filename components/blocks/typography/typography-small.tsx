import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export function TypographySmall({
  children,
  className,
}: { children: string } & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return <small className={cn('text-sm leading-none font-medium', className)}>{children}</small>;
}
