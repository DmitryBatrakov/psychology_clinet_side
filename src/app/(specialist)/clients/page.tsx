'use client';
import { AnimatedNumberChange } from '@/components/blocks/motion/animated-number-change';
import { TypographyExtraSmall } from '@/components/blocks/typography/typography-extra-small';
import Pipeline from '@/components/blocks/widgets/pipeline/pipeline';
import { AnyBlockConfig } from '@/components/blocks/widgets/pipeline/pipeline-body';
import Widget from '@/components/blocks/widgets/widget';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Crown, LucideIcon, Notebook, Pin, Plus, ShieldAlert, UserPlus, Users } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import ClientScrollArea from './client-scroll-area';
import SearchInput from './search-input';

type StatusColors = 'blue' | 'amber' | 'emerald' | 'fuchsia' | 'red';
type ClientStatus = 'regular' | 'new' | 'demanding' | 'VIP';
type RadioCategories = ClientStatus | 'all';

const radio_categories: { value: RadioCategories; icon: LucideIcon; color: StatusColors }[] = [
  {
    value: 'all',
    icon: Notebook,
    color: 'blue',
  },
  {
    value: 'regular',
    icon: Pin,
    color: 'amber',
  },
  {
    value: 'new',
    icon: UserPlus,
    color: 'emerald',
  },
  {
    value: 'VIP',
    icon: Crown,
    color: 'fuchsia',
  },
  {
    value: 'demanding',
    icon: ShieldAlert,
    color: 'red',
  },
];

export type Client = {
  name: string;
  phone: string;
  income: number;
  lastVisit: Date;
  totalVisits: number;
  description: string;
  status: ClientStatus;
  isAIAssists: boolean;
};

const clientsList: Client[] = [
  {
    name: 'Olivia Brown',
    phone: '+1 202 555 0147',
    description: 'Prefers quiet rooms, morning check-in.',
    status: 'VIP',
    lastVisit: new Date('2026-02-01'),
    totalVisits: 12,
    income: 8420,
    isAIAssists: true,
  },
  {
    name: 'James Lee',
    phone: '+1 202 555 0192',
    description: 'Business traveler.',
    status: 'regular',
    lastVisit: new Date('2026-01-20'),
    isAIAssists: false,
    totalVisits: 6,
    income: 3120,
  },
  {
    name: 'Sophia Turner',
    phone: '+1 202 555 0113',
    description: 'Late checkout often.',
    status: 'regular',
    isAIAssists: false,
    lastVisit: new Date('2026-01-28'),
    totalVisits: 8,
    income: 4210,
  },
  {
    name: 'Daniel Moore',
    phone: '+1 202 555 0188',
    description: 'Family bookings.',
    isAIAssists: false,
    status: 'VIP',
    lastVisit: new Date('2026-01-10'),
    totalVisits: 15,
    income: 10550,
  },
  {
    name: 'Emma Davis',
    phone: '+1 202 555 0135',
    description: 'Spa services frequent.',
    isAIAssists: false,
    status: 'regular',
    lastVisit: new Date('2026-02-03'),
    totalVisits: 9,
    income: 5360,
  },
  {
    name: 'Liam Wilson',
    phone: '+1 202 555 0174',
    description: 'Prefers high floor rooms.',
    status: 'new',
    lastVisit: new Date('2026-02-04'),
    totalVisits: 1,
    income: 420,
    isAIAssists: true,
  },
  {
    name: 'Ava Martinez',
    phone: '+1 202 555 0121',
    description: 'Weekend stays.',
    status: 'regular',
    isAIAssists: false,
    lastVisit: new Date('2026-01-15'),
    totalVisits: 5,
    income: 2100,
  },
  {
    name: 'Noah Anderson',
    phone: '+1 202 555 0163',
    description: 'Business suite bookings.',
    status: 'VIP',
    isAIAssists: false,
    lastVisit: new Date('2026-02-02'),
    totalVisits: 18,
    income: 13400,
  },
  {
    name: 'Mia Thompson',
    phone: '+1 202 555 0142',
    description: 'Allergic to feathers.',
    isAIAssists: false,
    status: 'regular',
    lastVisit: new Date('2026-01-25'),
    totalVisits: 7,
    income: 3670,
  },
  {
    name: 'William Harris',
    phone: '+1 202 555 0181',
    isAIAssists: false,
    description: 'Gym and bar frequent.',
    status: 'regular',
    lastVisit: new Date('2026-01-30'),
    totalVisits: 10,
    income: 5900,
  },
  {
    name: 'Isabella Clark',
    phone: '+1 202 555 0159',
    description: 'Romantic weekend packages.',
    status: 'VIP',
    lastVisit: new Date('2026-02-01'),
    totalVisits: 14,
    isAIAssists: true,
    income: 11200,
  },
  {
    name: 'Benjamin Lewis',
    phone: '+1 202 555 0119',
    description: 'Conference attendee.',
    status: 'demanding',
    isAIAssists: false,
    lastVisit: new Date('2025-11-12'),
    totalVisits: 3,
    income: 1200,
  },
  {
    name: 'Charlotte Walker',
    phone: '+1 202 555 0178',
    description: 'Early check-in requests.',
    isAIAssists: false,
    status: 'regular',
    lastVisit: new Date('2026-01-19'),
    totalVisits: 6,
    income: 2840,
  },
  {
    name: 'Elijah Hall',
    phone: '+1 202 555 0104',
    description: 'Prefers sea view.',
    status: 'VIP',
    lastVisit: new Date('2026-02-04'),
    isAIAssists: false,
    totalVisits: 16,
    income: 12560,
  },
  {
    name: 'Amelia Young',
    phone: '+1 202 555 0138',
    description: 'Spa & wellness packages.',
    status: 'regular',
    lastVisit: new Date('2026-01-22'),
    totalVisits: 7,
    isAIAssists: true,
    income: 3890,
  },
  {
    name: 'Lucas King',
    phone: '+1 202 555 0199',
    description: 'Frequent room service.',
    status: 'regular',
    lastVisit: new Date('2026-01-18'),
    isAIAssists: false,
    totalVisits: 8,
    income: 4520,
  },
  {
    name: 'Harper Scott',
    phone: '+1 202 555 0166',
    description: 'Travel blogger.',
    status: 'VIP',
    lastVisit: new Date('2026-02-02'),
    totalVisits: 11,
    isAIAssists: false,
    income: 9780,
  },
  {
    name: 'Evelyn Green',
    phone: '+1 202 555 0126',
    description: 'Quiet floors only.',
    status: 'regular',
    lastVisit: new Date('2026-01-14'),
    totalVisits: 5,
    isAIAssists: true,
    income: 2400,
  },
  {
    name: 'Henry Adams',
    phone: '+1 202 555 0155',
    description: 'Business loyalty member.',
    status: 'VIP',
    lastVisit: new Date('2026-02-03'),
    totalVisits: 20,
    isAIAssists: true,
    income: 15800,
  },
  {
    name: 'Grace Nelson',
    phone: '+1 202 555 0186',
    description: 'Occasional stays.',
    status: 'demanding',
    lastVisit: new Date('2025-12-01'),
    totalVisits: 2,
    isAIAssists: false,
    income: 760,
  },
];

const PipelineBlocks: AnyBlockConfig[] = [
  {
    type: 'Income',
    props: {
      hours: { prev: 120, value: 145 },
      income: { prev: 2040, value: 3880 },
      mode: 'pre-hour',
      title: 'Income',
    },
  },
  {
    type: 'AverageProfitBlock',
    props: {
      prev: 45,
      value: 54,
      title: 'Avg Profit',
    },
  },
  {
    type: 'UtilizationBlock',
    props: {
      title: 'Utilization Time',
      prev: { hours: 75, total_hours: 120 },
      value: { hours: 70, total_hours: 120 },
    },
  },
  {
    type: 'TopServiceBlock',
    props: {
      prev: 1,
      value: 2,
      title: 'Top Service',
      service_name: 'Custom Furniture Production',
    },
  },
  {
    type: 'UnpopularServicBlock',
    props: {
      prev: 2,
      value: 0,
      title: 'Unpopular Service',
      service_name: 'Pipe Leak Repair',
    },
  },
];

export const normalize = (s: string) => s.replace(/\s+/g, '').toLowerCase();

export default function Clients() {
  const [height, setHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<RadioCategories>('all');

  const filterdList = useMemo(() => {
    const list =
      status !== 'all' ? clientsList.filter((client) => client.status === status) : clientsList;

    return list.filter(
      ({ name, phone }) =>
        normalize(name).trim().includes(search) || normalize(phone).trim().includes(search)
    );
  }, [status, search]);

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      'resize',
      () => {
        setHeight(headerRef.current?.clientHeight ?? 0);
      },
      { signal: controller.signal }
    );

    return () => controller.abort();
  }, []);

  useEffect(() => {
    setHeight(headerRef.current?.clientHeight ?? 0);
  }, [headerRef]);

  return (
    <div className="flex min-w-210 flex-1 flex-col">
      <div ref={headerRef} className="flex flex-col">
        <Widget
          variant="default"
          className="m-2 mb-0 flex h-fit min-h-fit w-[calc(100%-16px)] flex-row flex-nowrap items-center justify-between bg-white p-2"
        >
          <Widget.Header className="w-fit basis-auto items-end gap-1.25 pl-1.5">
            <Widget.Title className="gap-1">
              <div className="flex items-center gap-2 font-semibold">
                <Users size={16} />
                <span>
                  <span className="capitalize">{status}</span> clients
                </span>
              </div>
              <span className="-translate-y-1 text-xs">
                (
                <AnimatedNumberChange
                  fixed={0}
                  postfix=""
                  startValue={0}
                  value={filterdList.length}
                  Component={TypographyExtraSmall}
                />
                )
              </span>
            </Widget.Title>
          </Widget.Header>
          <Widget.Footer className="">
            <div className="flex gap-2">
              <SearchInput onChange={(value) => setSearch(value)} />
              <Button className="cursor-pointer bg-blue-500! hover:brightness-95">
                <span>Add new</span>
                <Plus />
              </Button>
            </div>
          </Widget.Footer>
        </Widget>

        <div className="w-full p-2">
          <Pipeline blocks={PipelineBlocks} />
        </div>

        <Widget variant="compact" className="h-fit min-h-fit px-2">
          <Widget.Content>
            <RadioGroup
              defaultValue="all"
              className="flex gap-2 *:cursor-pointer"
              onValueChange={(value) => setStatus(value as RadioCategories)}
            >
              {radio_categories.map((category) => (
                <Label key={`radio-category-${category.value}`}>
                  <RadioGroupItem className="peer sr-only" value={category.value} />
                  <span
                    className={cn(
                      'flex h-6.5 items-center gap-1 rounded-full border py-1 pr-1.75 pl-3 text-xs hover:brightness-95',

                      category.color === 'blue' &&
                        'peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-100 peer-data-[state=checked]:text-blue-600',
                      category.color === 'amber' &&
                        'peer-data-[state=checked]:border-amber-600 peer-data-[state=checked]:bg-amber-100 peer-data-[state=checked]:text-amber-600',
                      category.color === 'emerald' &&
                        'peer-data-[state=checked]:border-emerald-600 peer-data-[state=checked]:bg-emerald-100 peer-data-[state=checked]:text-emerald-600',
                      category.color === 'fuchsia' &&
                        'peer-data-[state=checked]:border-fuchsia-600 peer-data-[state=checked]:bg-fuchsia-100 peer-data-[state=checked]:text-fuchsia-600',
                      category.color === 'red' &&
                        'peer-data-[state=checked]:border-red-600 peer-data-[state=checked]:bg-red-100 peer-data-[state=checked]:text-red-600'
                    )}
                  >
                    <span className="capitalize">{category.value}</span>
                    <category.icon className="h-full" />
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </Widget.Content>
        </Widget>

        <div className="w-full p-2">
          <Separator className="" />
        </div>
      </div>

      <div
        style={{
          height: height ? `calc(100% - ${height}px)` : '100%',
        }}
        className="h-full min-h-70 overflow-hidden"
      >
        <ClientScrollArea mounted={Boolean(height)} list={filterdList} />
      </div>
    </div>
  );
}
