import { DetailedHTMLProps, HTMLAttributes } from 'react';

export function TypographyExtraSmall({
  children,
}: { children: string } & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return <small className="text-xs leading-none font-normal">{children}</small>;
}
