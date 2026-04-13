'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HatGlasses } from 'lucide-react';
import ClientCard from './client-card';
import { Client } from './page';
import Widget from '@/components/blocks/widgets/widget';

function ClientScrollArea({ list, mounted }: { mounted: boolean; list: Client[] }) {
  return (
    <Widget variant="compact">
      <Widget.Content className="min-h-full w-full">
        <ScrollArea className="relative h-full max-h-[calc(var(--widget-content-height)-2px)] w-full">
          {mounted && (
            <div className="grid h-fit w-full grid-cols-3 gap-3 p-2 pt-0.5">
              {list.length ? (
                list.map((client, index) => (
                  <ClientCard {...client} key={`message-${client.name}-${index}`} />
                ))
              ) : (
                <div className="text-muted-foreground absolute flex size-full flex-col items-center justify-center gap-2">
                  <HatGlasses size={100} className="stroke-1" />
                  <span>Nothing founded.</span>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </Widget.Content>
    </Widget>
  );
}

export default ClientScrollArea;
