import { Item, ItemContent, ItemFooter, ItemHeader } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { Info, Square } from 'lucide-react';
import { Tooltip } from 'recharts';

type BarTypeValue = 'year' | 'month' | 'week' | 'day';

function IncomeTooltip({ type }: { type: BarTypeValue }) {
  return (
    <Tooltip
      content={({ active, payload, label }) => {
        if (!active || !payload?.length) return null;

        const d = new Date(label as string);

        const title =
          type === 'year'
            ? new Intl.DateTimeFormat('en', {
                month: 'long',
                year: 'numeric',
              }).format(d)
            : type === 'month'
              ? new Intl.DateTimeFormat('en', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }).format(d)
              : type === 'week'
                ? new Intl.DateTimeFormat('en', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'short',
                  }).format(d)
                : new Intl.DateTimeFormat('en', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  }).format(d);

        return (
          <Item className="w-44 gap-0 bg-white p-0 shadow-[0_0_3px_0] shadow-black/15">
            <ItemHeader className="p-2 font-semibold">
              <span>{title}</span>
              <Info size={16} />
            </ItemHeader>
            <Separator />
            <ItemContent className="bg-accent p-2">
              {payload
                .map(({ name, color, value }, index) => (
                  <div key={`${name}-${value}-${index}`} className="flex capitalize">
                    <span className="flex flex-1 items-center gap-1 underline underline-offset-2">
                      <Square size={12} fill={color} stroke={color} />
                      <span>{name}:</span>
                    </span>
                    <span>{value}$</span>
                  </div>
                ))
                .reverse()}
            </ItemContent>
            <Separator />
            <ItemFooter className="p-2">
              <div className="flex w-full font-semibold capitalize">
                <span className="flex flex-1 items-center gap-1">
                  <Square size={12} fill="#fc8a38" stroke="#fc8a38" />
                  <span>Expected:</span>
                </span>
                <span>{payload.at(0)?.payload.expected}$</span>
              </div>
            </ItemFooter>
          </Item>
        );
      }}
    />
  );
}

export default IncomeTooltip;
