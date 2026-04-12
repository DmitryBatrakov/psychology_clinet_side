import { DetailedHTMLProps, HTMLAttributes } from 'react';

export function Typography({
  children,
  className,
}: { children: string } & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return <span className={className}>{children}</span>;
}
