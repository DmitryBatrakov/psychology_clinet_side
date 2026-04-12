import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bot, BrainCircuit, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import Widget, { WidgetProps } from '../widget';
import AITipBody from './ai-tip-body';

function AITip({ ...rest }: WidgetProps) {
  const [useful, setUseful] = useState<1 | 0 | -1>(0);

  return (
    <Widget {...rest}>
      <Widget.Header>
        <Widget.Title>
          <Bot size={18} /> AI Secretary
        </Widget.Title>
      </Widget.Header>
      <Widget.Content className="flex min-h-fit w-full basis-0 flex-row items-center justify-between">
        <AITipBody />
      </Widget.Content>

      <Widget.Footer className="shrink-0 justify-start *:cursor-pointer">
        <Button
          size={'sm'}
          variant={'secondary'}
          onClick={() => setUseful((cur) => (cur === 1 ? 0 : 1))}
          className={cn(
            'hover:bg-emerald-100 hover:text-emerald-600 hover:brightness-95',
            useful === 1 && 'bg-emerald-100 text-emerald-600'
          )}
        >
          <ThumbsUp />
        </Button>

        <Button
          size={'sm'}
          variant={'secondary'}
          onClick={() => setUseful((cur) => (cur === -1 ? 0 : -1))}
          className={cn(
            'hover:bg-rose-100 hover:text-rose-600 hover:brightness-95',
            useful === -1 && 'bg-rose-100 text-rose-600'
          )}
        >
          <ThumbsDown />
        </Button>

        <Button
          size={'sm'}
          variant={'secondary'}
          className="hover:bg-fuchsia-100 hover:text-fuchsia-600"
        >
          <BrainCircuit />
          <span>Generate new tip</span>
        </Button>
      </Widget.Footer>
    </Widget>
  );
}

export default AITip;
