import { LayoutList, UserStar } from 'lucide-react';
import Widget, { WidgetProps } from '../widget';
import { ClientsLTVDataTable } from './clients-ltv-data-table';
import { ClientLTV, columns } from './columns';

const data: ClientLTV[] = [
  {
    client: 'Анна Иванова',
    visits: 12,
    last_appt: new Date('2025-01-14'),
    no_show: 1,
  },
  {
    client: 'Мария Петрова',
    visits: 5,
    last_appt: new Date('2024-12-02'),
    no_show: 0,
  },
  {
    client: 'Ольга Смирнова',
    visits: 20,
    last_appt: new Date('2025-02-01'),
    no_show: 3,
  },
  {
    client: 'Елена Кузнецова',
    visits: 2,
    last_appt: new Date('2024-10-18'),
    no_show: 1,
  },
  {
    client: 'Наталья Орлова',
    visits: 9,
    last_appt: new Date('2025-01-30'),
    no_show: 0,
  },
];

function ClintsLTV({ ...rest }: WidgetProps) {
  return (
    <Widget {...rest}>
      <Widget.Header className="w-full basis-0">
        <Widget.Title>
          <UserStar size={18} /> Top Clients by LTV
        </Widget.Title>

        <Widget.PeriodSelect />
      </Widget.Header>
      <Widget.Content
        className="overflow-hidden"
        skeleton={
          <LayoutList className="stroke-muted-foreground aspect-square size-3/6 stroke-[1.25]" />
        }
      >
        <ClientsLTVDataTable data={data.sort((a, b) => b.visits - a.visits)} columns={columns} />
      </Widget.Content>
    </Widget>
  );
}

export default ClintsLTV;
