'use client';
import Pipeline from '@/components/blocks/widgets/pipeline/pipeline';
import { Separator } from '@/components/ui/separator';
import { columns, Service } from './columns';
import { DataTable } from './data-table';
import Widget from '@/components/blocks/widgets/widget';
import { AnyBlockConfig } from '@/components/blocks/widgets/pipeline/pipeline-body';
import { useEffect, useRef, useState } from 'react';

const data: Service[] = [
  {
    service: 'Women’s Haircut',
    category: 'Beauty',
    price: 45,
    duration: '1 h',
    availability: 'Mon–Sat',
    status: 'Active',
  },
  {
    service: 'Massage Therapy',
    category: 'Beauty',
    price: 80,
    duration: '1 h 30 min',
    availability: 'Weekends',
    status: 'Active',
  },
  {
    service: 'Pipe Leak Repair',
    category: 'Repair',
    price: 95,
    duration: '1 h',
    availability: 'On request',
    status: 'Active',
  },
  {
    service: 'Apartment Deep Cleaning',
    category: 'Cleaning',
    price: 150,
    duration: '3 h',
    availability: 'Mon–Sun',
    status: 'Active',
  },
  {
    service: 'Business Consultation',
    category: 'Consulting',
    price: 200,
    duration: '2 h',
    availability: 'Mon–Fri',
    status: 'Draft',
  },
  {
    service: 'Logo & Branding Kit',
    category: 'Creative',
    price: 300,
    duration: '5 days',
    availability: 'Remote',
    status: 'Active',
  },
  {
    service: 'Website Development',
    category: 'IT & Digital',
    price: 900,
    duration: '10 days',
    availability: 'Remote',
    status: 'Active',
  },
  {
    service: 'English Tutoring',
    category: 'Coaching',
    price: 40,
    duration: '1 h',
    availability: 'Evenings',
    status: 'Active',
  },
  {
    service: 'Personal Training Session',
    category: 'Fitness',
    price: 60,
    duration: '1 h',
    availability: 'Weekends',
    status: 'Active',
  },
  {
    service: 'Wedding Photography',
    category: 'Events',
    price: 1200,
    duration: 'Full day',
    availability: 'By booking',
    status: 'Active',
  },
  {
    service: 'Furniture Moving Help',
    category: 'Logistics',
    price: 250,
    duration: '4 h',
    availability: 'Weekends',
    status: 'Hidden',
  },
  {
    service: 'Car Engine Diagnostics',
    category: 'Automotive',
    price: 110,
    duration: '1 h',
    availability: 'Mon–Sat',
    status: 'Active',
  },
  {
    service: 'Air Conditioner Installation',
    category: 'Home Services',
    price: 350,
    duration: '3 h',
    availability: 'On request',
    status: 'Draft',
  },
  {
    service: 'Dog Grooming',
    category: 'Pet Care',
    price: 55,
    duration: '1 h',
    availability: 'By appointment',
    status: 'Active',
  },
  {
    service: 'Babysitting (Evening)',
    category: 'Childcare',
    price: 35,
    duration: '3 h',
    availability: 'Evenings',
    status: 'Active',
  },
  {
    service: 'Event Catering',
    category: 'Food & Catering',
    price: 2000,
    duration: 'Full day',
    availability: 'By booking',
    status: 'Draft',
  },
  {
    service: 'Property Consultation',
    category: 'Real Estate',
    price: 150,
    duration: '1 h',
    availability: 'Mon–Fri',
    status: 'Active',
  },
  {
    service: 'Travel Itinerary Planning',
    category: 'Tourism',
    price: 180,
    duration: '2 days',
    availability: 'Remote',
    status: 'Active',
  },
  {
    service: 'CCTV Installation',
    category: 'Security',
    price: 600,
    duration: '5 h',
    availability: 'On request',
    status: 'Hidden',
  },
  {
    service: 'Custom Furniture Production',
    category: 'Manufacturing',
    price: 1200,
    duration: '14 days',
    availability: 'By order',
    status: 'Draft',
  },
  {
    service: 'Custom Service Package',
    category: 'Other',
    price: 300,
    duration: 'Varies',
    availability: 'Flexible',
    status: 'Active',
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

export default function MyServices() {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      'resize',
      () => {
        setHeight((ref.current?.clientHeight ?? 0) - (headRef.current?.clientHeight ?? 0));
      },
      { signal: controller.signal }
    );

    return () => controller.abort();
  }, []);

  return (
    <div ref={ref} className="flex min-w-210 flex-1 flex-col">
      <div ref={headRef} className="flex flex-col">
        <div className="w-full p-2">
          <Pipeline blocks={PipelineBlocks} />
        </div>

        <div className="w-full px-2">
          <Separator className="" />
        </div>
      </div>

      <div className="h-full min-h-70 overflow-hidden">
        <Widget
          variant="compact"
          style={{
            height: height ? `${height}px` : '100%',
            minHeight: height ? `${height}px` : '100%',
            maxHeight: height ? `${height}px` : '100%',
          }}
        >
          <Widget.Content>
            <DataTable columns={columns} data={data} />
          </Widget.Content>
        </Widget>
      </div>
    </div>
  );
}
