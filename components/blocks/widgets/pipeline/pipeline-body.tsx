'use client';
import React from 'react';
import AverageProfitBlock from './blocks/average-profit-block';
import CancelationBlock from './blocks/cancelation-block';
import ExpectedBlock from './blocks/expected-block';
import IncomeBlock from './blocks/income-block';
import OrdersBlock from './blocks/orders-block';
import TopServiceBlock from './blocks/top-service-block';
import UnpopularServicBlock from './blocks/unpopular-service-block';
import UtilizationBlock from './blocks/utilization-block';
import ConversionBlock from './blocks/сonversion-block';

const BLOCKS_LIST = {
  Income: IncomeBlock,
  Orders: OrdersBlock,
  Cancelation: CancelationBlock,
  Conversion: ConversionBlock,
  Expected: ExpectedBlock,
  TopServiceBlock: TopServiceBlock,
  AverageProfitBlock: AverageProfitBlock,
  UnpopularServicBlock: UnpopularServicBlock,
  UtilizationBlock: UtilizationBlock,
} as const;

type PipelineBlocks = keyof typeof BLOCKS_LIST;

type BlockPropsMap = {
  [K in PipelineBlocks]: React.ComponentProps<(typeof BLOCKS_LIST)[K]>;
};

export type AnyBlockConfig = {
  [K in PipelineBlocks]: {
    type: K;
    props: BlockPropsMap[K];
  };
}[PipelineBlocks];

function PipelineBody({ blocks }: { blocks: AnyBlockConfig[] }) {
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${blocks.length}, minmax(0, 1fr))` }}
      className="grid h-full w-full gap-2 *:grow *:shadow-[0_0_4px_0] *:shadow-black/15"
    >
      {blocks.map((block) => {
        const Component = BLOCKS_LIST[block.type] as React.ComponentType<typeof block.props>;
        return <Component key={block.type} {...block.props} />;
      })}
    </div>
  );
}

export default PipelineBody;
