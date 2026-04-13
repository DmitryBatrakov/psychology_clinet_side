'use client';
import { ChartColumn, ChartColumnBig, Square } from 'lucide-react';
import { AnimatedNumberChange } from '../../motion/animated-number-change';
import { TypographySmall } from '../../typography/typography-small';
import Widget, { WidgetProps } from '../widget';
import IncomeBody from './income-body';

export const barData = [
  {
    name: 'income',
    value: 30,
    color: '#fa3434',
  },
  {
    name: 'loss',
    value: 20,
    color: '#a1a1a1',
  },
];

function Income({ ...rest }: WidgetProps) {
  return (
    <Widget {...rest}>
      <Widget.Header className="w-full basis-0">
        <Widget.Title>
          <ChartColumnBig size={18} /> Overview Income
        </Widget.Title>
        <Widget.DateSelect />
      </Widget.Header>
      <Widget.Content
        heavy
        skeleton={
          <ChartColumn className="stroke-muted-foreground aspect-square size-4/10 stroke-[1.25]" />
        }
      >
        <IncomeBody />
      </Widget.Content>
      <Widget.Footer className="relative my-auto flex h-fit w-fit flex-wrap gap-x-3 gap-y-2">
        {barData.map((entry) => (
          <span key={`square-${entry.name}`} className="flex min-w-32 items-center justify-between">
            <div className="flex items-center gap-2">
              <Square size={12} fill={entry.color} stroke={entry.color} />
              <span className="text-muted-foreground text-xs capitalize">{entry.name}</span>
            </div>
            <AnimatedNumberChange postfix="%" value={entry.value} Component={TypographySmall} />
          </span>
        ))}
      </Widget.Footer>
    </Widget>
  );
}

export default Income;
