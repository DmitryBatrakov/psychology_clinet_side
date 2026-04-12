'use client';
import { sidebar_groups } from '@/components/blocks/nav/app-sidebar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Docs() {
  const group = sidebar_groups.find((group) => group.label === 'Platform');
  const menu = group?.menu.find((item) => item.title === 'Documentation');

  const cards =
    menu?.submenu?.map(({ icon, title, url }) => ({
      icon,
      title,
      url: menu.url + url,
    })) ?? [];

  return (
    <div className="flex size-full flex-col items-center justify-center gap-6">
      <b className="text-4xl">{menu?.title}</b>
      <div
        style={{
          maxWidth: Math.ceil(cards.length / 2) * (260 + 12),
          gridTemplateColumns: `repeat(${Math.ceil(cards.length / 2)}, minmax(0, 1fr))`,
        }}
        className="flex h-80 flex-wrap justify-center gap-3"
      >
        {cards.map(({ title, url, icon: Icon }) => (
          <Link href={url} key={url} className="w-65">
            <Card
              className={cn(
                'text-muted-foreground size-full items-center justify-center border-none shadow-[0_0_6px_0] shadow-black/15 transition-all',
                'hover:scale-95 hover:shadow-[0_0_6px_0_inset]'
              )}
            >
              <CardHeader className="items-center justify-center">
                <Icon size={80} className="stroke-1" />
                <CardTitle className="text-center">{title}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
