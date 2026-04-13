'use client';
import Widget, { WidgetProps } from '../widget';
import PipelineBody, { AnyBlockConfig } from './pipeline-body';

function Pipeline({ blocks, ...rest }: WidgetProps & { blocks: AnyBlockConfig[] }) {
  return (
    <Widget variant="compact" {...rest}>
      <Widget.Content className="flex h-full min-h-fit w-full basis-0 flex-row items-end justify-between">
        <PipelineBody blocks={blocks} />
      </Widget.Content>
    </Widget>
  );
}

export default Pipeline;
