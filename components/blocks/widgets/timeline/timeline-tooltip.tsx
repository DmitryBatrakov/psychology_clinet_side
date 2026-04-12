import { Item, ItemContent, ItemFooter, ItemHeader } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';
import { Tooltip } from 'recharts';
import { colorByOutcome, TimelineRow } from './timeline';
import { mmToHHMM } from './timeline-halpers';

export default function TimelineTooltip() {
  return (
    <Tooltip
      content={({ active, payload }) => {
        if (!active || !payload?.length) return null;

        const row: TimelineRow = payload[0].payload;
        const [s, e] = row.first;

        return (
          <Item className="block min-w-64 gap-0 bg-white p-0 shadow-[0_0_3px_0] shadow-black/15">
            <ItemHeader className="w-full gap-4 p-2 font-semibold">
              <span>{row.name}</span>
              <Info size={16} />
            </ItemHeader>
            <Separator />
            <ItemContent className="bg-accent w-full p-2">
              <div className="flex">
                <span className="flex w-full items-end justify-between">
                  <span className="flex flex-1 items-center gap-1 underline">
                    {/* <Square
                      size={12}
                      fill={colorByOutcome[row.outcome]}
                      stroke={colorByOutcome[row.outcome]}
                    /> */}
                    <span>Status:</span>
                  </span>
                  <span
                    style={{ color: colorByOutcome[row.outcome] }}
                    className="text-xs font-light"
                  >
                    {row.outcome}
                  </span>
                </span>
              </div>
            </ItemContent>

            <Separator />
            <ItemFooter className="p-2">
              <div className="flex w-full justify-between font-semibold capitalize">
                <span>From: {mmToHHMM(s)}</span>—<span>To: {mmToHHMM(e)}</span>
              </div>
            </ItemFooter>
          </Item>
        );
      }}
    />
  );
}
