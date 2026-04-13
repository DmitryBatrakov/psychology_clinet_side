import { Item, ItemContent, ItemFooter, ItemHeader } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { Info, Square } from 'lucide-react';
import { Tooltip } from 'recharts';

function WorkloadTooltip() {
  return (
    <Tooltip
      content={({ active, payload }) => {
        if (!active || !payload?.length) return null;

        return (
          <Item className="w-44 gap-0 bg-white p-0 shadow-[0_0_3px_0] shadow-black/15">
            <ItemHeader className="p-2 font-semibold">
              <span>Info</span>
              <Info size={16} />
            </ItemHeader>
            <Separator />
            <ItemContent className="p-2">
              {payload
                .map(({ payload: { name, color, value } }, index) => (
                  <div key={`${name}-${value}-${index}`} className="flex font-semibold capitalize">
                    <span className="flex flex-1 items-center gap-1">
                      <Square size={12} fill={color} stroke={color} />
                      <span>{name}:</span>
                    </span>
                    <span>{value}%</span>
                  </div>
                ))
                .reverse()}
            </ItemContent>
            <Separator />
            <ItemFooter className="p-2">
              <div className="flex w-full font-semibold capitalize">
                <span className="flex flex-1 items-center gap-1">
                  <Square size={12} fill="#34bf49 " stroke="#34bf49 " />
                  <span>Profit:</span>
                </span>
                <span>
                  {payload[0].name === 'leisure' && '-'}
                  {Math.round(Math.random() * 100)}$
                </span>
              </div>
            </ItemFooter>
          </Item>
        );
      }}
    />
  );
}

export default WorkloadTooltip;
