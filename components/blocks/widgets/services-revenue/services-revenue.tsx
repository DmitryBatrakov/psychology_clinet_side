import { Receipt, Table } from 'lucide-react';
import Widget, { WidgetProps } from '../widget';
import { columns, RevenueService } from './columns';
import { ServicesRevenueDataTable } from './services-revenue-data-table';

const data: RevenueService[] = [
  {
    service: 'Haircut',
    revenue: 1250,
    appts: 25,
    share: 32,
  },
  {
    service: 'Coloring',
    revenue: 2140,
    appts: 18,
    share: 41,
  },
  {
    service: 'Manicure',
    revenue: 980,
    appts: 28,
    share: 19,
  },
  {
    service: 'Pedicure',
    revenue: 430,
    appts: 10,
    share: 8,
  },
  {
    service: 'Spa Treatment',
    revenue: 1560,
    appts: 12,
    share: 27,
  },
];

function ServicesRevenue({ ...rest }: WidgetProps) {
  return (
    <Widget {...rest}>
      <Widget.Header className="w-full basis-0">
        <Widget.Title>
          <Receipt size={18} /> Services Revenue
        </Widget.Title>
        <Widget.PeriodSelect />
      </Widget.Header>
      <Widget.Content
        className="overflow-hidden"
        skeleton={
          <Table className="stroke-muted-foreground aspect-square size-3/6 stroke-[1.25]" />
        }
      >
        <ServicesRevenueDataTable data={data.sort((a, b) => b.share - a.share)} columns={columns} />
      </Widget.Content>
    </Widget>
  );
}

export default ServicesRevenue;
