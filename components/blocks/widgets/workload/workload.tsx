'use client';
import { FilePieChart, PieChart } from 'lucide-react';
import Widget, { WidgetProps } from '../widget';
import WorkloadPieChart from './workload-body';

function Workload({ ...rest }: WidgetProps) {
  return (
    <Widget {...rest}>
      <Widget.Header>
        <Widget.Title>
          <FilePieChart size={18} /> Workload
        </Widget.Title>
        <Widget.PeriodSelect />
      </Widget.Header>
      <Widget.Content
        heavy
        skeleton={
          <PieChart className="stroke-muted-foreground aspect-square size-3/6 stroke-[1.25]" />
        }
      >
        <WorkloadPieChart />
      </Widget.Content>
    </Widget>
  );
}

export default Workload;
